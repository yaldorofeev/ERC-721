import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import * as dotenv from "dotenv";

describe("My721Contract", function () {

  let my721Contract: Contract;
  let accounts: Signer[];

  it("Should deploy contract", async function () {
    const My721Contract = await ethers.getContractFactory("My721Contract");
    my721Contract = await My721Contract.deploy();
    await my721Contract.deployed();
  });

  it("Test revert of mint function", async function () {
    accounts = await ethers.getSigners();
    await expect(my721Contract.connect(accounts[2])
    .mint(await accounts[2].getAddress(), 1, "sddd"))
    .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Test mint function", async function () {
    await expect(my721Contract.connect(accounts[0])
    .mint(await accounts[2].getAddress(), 1, "sddd"))
    .to.emit(my721Contract, "Transfer")
    .withArgs(ethers.constants.AddressZero,
      await accounts[2].getAddress(), 1);
  });

  it("Test approve", async function () {

    await expect(my721Contract.connect(accounts[2])
    .approve(await accounts[0].getAddress(), 1))
    .to.emit(my721Contract, "Approval")
    .withArgs(await accounts[2].getAddress(),
      await accounts[0].getAddress(), 1);
  });

  it("Test transfer", async function () {
    const contract = my721Contract.connect(accounts[0]);
    await expect(contract["safeTransferFrom(address,address,uint256)"](
      await accounts[2].getAddress(),
      await accounts[3].getAddress(), 1))
    .to.emit(my721Contract, "Transfer")
    .withArgs(await accounts[2].getAddress(),
      await accounts[3].getAddress(), 1);
  });

  it("Test change ownership", async function () {
    const contract = my721Contract.connect(accounts[0]);
    await expect(contract.transferOwnership(await accounts[1].getAddress()))
    .to.emit(my721Contract, "OwnershipTransferred")
    .withArgs(await accounts[0].getAddress(),
      await accounts[1].getAddress());
  });

});
