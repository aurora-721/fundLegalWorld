// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const Token = await hre.ethers.getContractFactory("ERC20Dummy");
  const token = await Token.deploy("DAI", 18);
  const { interface: tokenAbi} = await token.deployed();
  
  console.log(
    `Dummy ERC20 deployed to ${token.address}`
  );
  
  const Legislatoor = await hre.ethers.getContractFactory("Legislatoor");
  const legislatoor = await Legislatoor.deploy(token.address);
  const { interface: abi} = await legislatoor.deployed();
  
  console.log(
    `Legislatoor with ERC20 ${token.address} deployed to ${legislatoor.address}`
  );
    
  const [owner] = await ethers.getSigners();
  const {chainId} = await ethers.provider.getNetwork()
  

  const paramsMint = {
    abiInterface: tokenAbi,
    name: "mint",
    type: "function",
  };
		
  const {inputsMint,nameMint} = hre.OpenzeppelinDefender.Utils.getAbiInterfaceParams(paramsMint);

  const mint = {
    contract: {
      network: await hre.OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: token.address,
      name: "ERC20Dummy",
      abi: tokenAbi.format(ethers.utils.FormatTypes.json)
    },
    title: "Mint DAI",
    description: "",
    type: "custom", 
    functionInterface: {
      name: nameMint,
      inputs: inputsMint,
    },
    functionInputs: [owner.address,"100000000000000000000"],
    via: owner.address,
    viaType:'EOA'
  };
		
  await hre.OpenzeppelinDefender.AdminClient.createProposal(mint);


  const paramsApprove = {
    abiInterface: tokenAbi,
    name: "approve",
    type: "function",
  };
		
  const {inputsDai,nameDai} = hre.OpenzeppelinDefender.Utils.getAbiInterfaceParams(paramsApprove);
  const approve = {
    contract: {
      network: await hre.OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: token.address,
      name: "ERC20Dummy",
      abi: tokenAbi.format(ethers.utils.FormatTypes.json)
    },
    title: "Approve DAI",
    description: "",
    type: "custom", 
    functionInterface: {
      name: nameDai,
      inputs: inputsDai,
    },
    functionInputs: [owner.address,"100000000000000000000"],
    via: owner.address,
    viaType:'EOA'
  };
		
  await hre.OpenzeppelinDefender.AdminClient.createProposal(approve);



  const params = {
    abiInterface: abi,
    name: "contribute",
    type: "function",
  };
		
  const {inputs,name} = hre.OpenzeppelinDefender.Utils.getAbiInterfaceParams(params);
  const contribute = {
    contract: {
      network: await hre.OpenzeppelinDefender.Utils.fromChainId(chainId),
      address: legislatoor.address,
      name: "Legislatoor",
      abi: abi.format(ethers.utils.FormatTypes.json)
    },
    title: "Contribute to 1",
    description: "",
    type: "custom", 
    functionInterface: {
      name: name,
      inputs: inputs,
    },
    functionInputs: ["1","100000000"],
    via: owner.address,
    viaType:'EOA'
  };
		
  await hre.OpenzeppelinDefender.AdminClient.createProposal(contribute);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
