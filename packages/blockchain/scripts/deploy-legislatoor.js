// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const token = {
    address: "0xF7603dBfe8A9fD3a58FC327F2da8D55A9b1CFF0d"
  }

  const Legislatoor = await hre.ethers.getContractFactory("Legislatoor");
  const legislatoor = await Legislatoor.deploy(token.address);
  const { interface: abi} = await legislatoor.deployed();
  
  console.log(
    `Legislatoor with ERC20 ${token.address} deployed to ${legislatoor.address}`
  );
    
  const [owner] = await ethers.getSigners();
  const {chainId} = await ethers.provider.getNetwork()
  
  // const paramsApprove = {
  //   abiInterface: tokenAbi,
  //   name: "approve",
  //   type: "function",
  // };
		
  // const {inputsApprove,nameApprove} = hre.OpenzeppelinDefender.Utils.getAbiInterfaceParams(paramsApprove);
  // const approve = {
  //   contract: {
  //     network: await hre.OpenzeppelinDefender.Utils.fromChainId(chainId),
  //     address: "0xF7603dBfe8A9fD3a58FC327F2da8D55A9b1CFF0d",
  //     name: "ERC20Dummy",
  //     abi: tokenAbi.format(ethers.utils.FormatTypes.json)
  //   },
  //   title: "Approve DAI",
  //   description: "",
  //   type: "custom", 
  //   functionInterface: {
  //     name: nameApprove,
  //     inputs: inputsApprove,
  //   },
  //   functionInputs: [legislatoor.address,"100000000000000000000"],
  //   via: owner.address,
  //   viaType:'EOA'
  // };
		
  // await hre.OpenzeppelinDefender.AdminClient.createProposal(approve);

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
    title: "Contribute 10 to 1",
    description: "",
    type: "custom", 
    functionInterface: {
      name: name,
      inputs: inputs,
    },
    functionInputs: ["1","10"],
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
