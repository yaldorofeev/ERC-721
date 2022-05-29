import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("transfer", "Transfer tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("from", "The account which transmit tokens")
  .addParam("to", "The account which recieves tokens")
  .addParam("tokenid", "The amount of tokens to transfer")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My721Contract",
  process.env.ERC721_CONTRACT!, accounts[args.requesting]);
  contract.on("Transfer", (from, to, tokenid, event) => {
    console.log({
      from: from,
      to: to,
      amount: tokenid.toNumber(),
      data: event
    });
  });
  const tx = await contract.["safeTransferFrom(address,address,uint256)"]
  (args.from, args.to, args.tokenid);
  tx.wait();
  console.log(tx);
});
