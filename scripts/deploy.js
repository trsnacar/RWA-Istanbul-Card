async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const IstanbulkartToken = await ethers.getContractFactory("IstanbulkartToken");
    const token = await IstanbulkartToken.deploy(1000000);
    console.log("Token deployed to:", token.address);
  
    const RewardProgram = await ethers.getContractFactory("RewardProgram");
    const rewardProgram = await RewardProgram.deploy(token.address);
    console.log("Reward Program deployed to:", rewardProgram.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  