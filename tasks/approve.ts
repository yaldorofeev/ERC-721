import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("approve", "Approve to transfer tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("spender", "The account which was allowed to transfer tokens")
  .addParam("tokenid", "The amount of tokens to transfer")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My721Contract",
  process.env.ERC721_CONTRACT!, accounts[args.requesting]);

  const tx = await contract.approve(args.spender, args.tokenid);
  contract.on("Approval", (owner, spender, tokenid, event) => {
    console.log({
      owner: owner,
      spender: spender,
      amount: tokenid.toNumber(),
      data: event
    });
  });
  // tx.wait();
  // console.log(tx);
});
