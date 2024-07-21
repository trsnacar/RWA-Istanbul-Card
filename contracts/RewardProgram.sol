// contracts/RewardProgram.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardProgram is Ownable {
    ERC20 public istanbulkartToken;
    mapping(address => uint256) public rewards;

    constructor(ERC20 _istanbulkartToken) Ownable(msg.sender) {
        istanbulkartToken = _istanbulkartToken;
    }

    function rewardUser(address user, uint256 amount) external onlyOwner {
        rewards[user] += amount;
        istanbulkartToken.transfer(user, amount);
    }
}
