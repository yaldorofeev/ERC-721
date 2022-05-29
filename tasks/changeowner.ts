import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("changeowner", "Change ownership of the contract")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("to", "The account which recieves ownership")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My721Contract",
  process.env.ERC721_CONTRACT!, accounts[args.requesting]);
  contract.on("OwnershipTransferred", (from, to, event) => {
    console.log({
      from: from,
      to: to,
      data: event
    });
  });
  const tx = await contract.transferOwnership(args.to);
  tx.wait();
  console.log(tx);
});
