const { ethers } = require("hardhat");
const { expect } = require("chai");
const { waffle } = require("ethereum-waffle");

chai.use(waffle.solidity);

describe("RewardProgram", function () {
  let Token, Reward, token, rewardProgram, owner, addr1;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("IstanbulkartToken");
    Reward = await ethers.getContractFactory("RewardProgram");

    [owner, addr1, _] = await ethers.getSigners();

    token = await Token.deploy(1000000);
    rewardProgram = await Reward.deploy(token.address);
  });

  describe("Reward Distribution", function () {
    it("Should reward users correctly", async function () {
      await token.transfer(rewardProgram.address, 100);

      await rewardProgram.rewardUser(addr1.address, 50);
      const addr1Balance = await token.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);
    });
  });
});
