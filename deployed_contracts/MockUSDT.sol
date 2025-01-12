// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockUSDT is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("MockUSDT", "mUSDT") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot mint to the zero address");
        require(amount > 0, "Amount must be greater than zero");
        _mint(to, amount);
    }
}


// deployed on eth-sepolia, contract address: 0xdDB7FD3D70bb4d99DdF65aCEdCCC743D68dEDB44