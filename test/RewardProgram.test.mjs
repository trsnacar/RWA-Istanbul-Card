import hardhat from "hardhat";
import { expect } from "chai";

const { ethers } = hardhat;

describe("RewardProgram", function () {
  let Token, Reward, token, rewardProgram, owner, addr1;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("IstanbulkartToken");
    Reward = await ethers.getContractFactory("RewardProgram");

    [owner, addr1] = await ethers.getSigners();

    token = await Token.deploy(1000000);
    rewardProgram = await Reward.deploy(await token.getAddress());
  });

  describe("Reward Distribution", function () {
    it("Should reward users correctly", async function () {
      await token.transfer(await rewardProgram.getAddress(), 100);

      await rewardProgram.rewardUser(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });

    it("Should revert when rewarding the zero address", async function () {
      await token.transfer(await rewardProgram.getAddress(), 100);
      await expect(
        rewardProgram.rewardUser(ethers.ZeroAddress, 50)
      ).to.be.revertedWith("RewardProgram: zero user address");
    });

    it("Should revert when rewarding a zero amount", async function () {
      await expect(
        rewardProgram.rewardUser(addr1.address, 0)
      ).to.be.revertedWith("RewardProgram: zero amount");
    });

    it("Should revert when a non-owner tries to reward", async function () {
      await token.transfer(await rewardProgram.getAddress(), 100);
      await expect(
        rewardProgram.connect(addr1).rewardUser(addr1.address, 50)
      ).to.be.revertedWithCustomError(rewardProgram, "OwnableUnauthorizedAccount");
    });
  });
});
