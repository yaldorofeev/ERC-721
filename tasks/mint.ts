import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("mint", "Mint tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("account", "The account that recieves token")
  .addParam("tokenid", "The ID of token")
  .addParam("tokenuri", "The amount of tokens to mint")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My721Contract",
  process.env.ERC721_CONTRACT!, accounts[args.requesting]);
  const tx = await contract.mint(args.account, args.tokenid, args.tokenuri);
  tx.wait();
  console.log(tx);
});
