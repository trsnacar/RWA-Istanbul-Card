async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    const IstanbulkartToken = await ethers.getContractFactory("IstanbulkartToken");
    const token = await IstanbulkartToken.deploy(1000000);
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("Token deployed to:", tokenAddress);

    const RewardProgram = await ethers.getContractFactory("RewardProgram");
    const rewardProgram = await RewardProgram.deploy(tokenAddress);
    await rewardProgram.waitForDeployment();
    console.log("Reward Program deployed to:", await rewardProgram.getAddress());
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  