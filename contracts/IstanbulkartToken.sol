// contracts/IstanbulkartToken.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title IstanbulkartToken
/// @notice ERC20 token representing the tokenized Istanbulkart real-world asset (RWA).
/// @dev The entire `initialSupply` is minted to the deployer at construction time.
contract IstanbulkartToken is ERC20 {
    /// @param initialSupply The total amount of tokens (in the smallest unit) minted to the deployer.
    constructor(uint256 initialSupply) ERC20("IstanbulkartToken", "IST") {
        _mint(msg.sender, initialSupply);
    }
}
