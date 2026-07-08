// contracts/RewardProgram.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title RewardProgram
/// @notice Lets the contract owner distribute IstanbulkartToken rewards to users
/// and keeps a running tally of rewards granted per address.
contract RewardProgram is Ownable {
    using SafeERC20 for ERC20;

    /// @notice The IstanbulkartToken used to pay out rewards.
    ERC20 public immutable istanbulkartToken;

    /// @notice Cumulative amount of rewards granted to each user.
    mapping(address => uint256) public rewards;

    /// @notice Emitted whenever a user is granted a reward.
    /// @param user The address that received the reward.
    /// @param amount The amount of tokens rewarded.
    event RewardGranted(address indexed user, uint256 amount);

    /// @param _istanbulkartToken Address of the deployed IstanbulkartToken contract.
    constructor(ERC20 _istanbulkartToken) Ownable(msg.sender) {
        require(address(_istanbulkartToken) != address(0), "RewardProgram: zero token address");
        istanbulkartToken = _istanbulkartToken;
    }

    /// @notice Rewards `user` with `amount` of IstanbulkartToken.
    /// @dev Only callable by the contract owner. Reverts if the token transfer fails.
    /// @param user The recipient of the reward. Must not be the zero address.
    /// @param amount The amount of tokens to reward.
    function rewardUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "RewardProgram: zero user address");
        require(amount > 0, "RewardProgram: zero amount");

        rewards[user] += amount;
        istanbulkartToken.safeTransfer(user, amount);

        emit RewardGranted(user, amount);
    }
}
