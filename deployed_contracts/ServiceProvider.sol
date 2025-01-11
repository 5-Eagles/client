// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ServiceProvider {
    IERC20 public token;
    address public owner;

    constructor(address tokenAddress) {
        require(tokenAddress != address(0), "Invalid token address");
        token = IERC20(tokenAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    // 유저에게 토큰 전송 (충전)
    function sendTokensToUser(address user, uint256 amount) external onlyOwner {
        require(user != address(0), "Invalid user address");
        require(user != address(this), "Cannot send to contract address");
        require(amount > 0, "Amount must be greater than zero");
        require(token.balanceOf(address(this)) >= amount, "Not enough tokens in the contract");

        bool success = token.transfer(user, amount);
        require(success, "Token transfer failed");
    }

    // 유저가 컨트랙트로 토큰 반환 (출금)
    function sendTokensToProvider(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(token.allowance(msg.sender, address(this)) >= amount, "Not enough allowance");

        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
    }

    // 컨트랙트의 토큰 잔액 확인
    function getContractBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}


// deployed on eth-sepolia, contract address: 0x58eAe138153FaAe02ECFa2F2068018e99BAa6416