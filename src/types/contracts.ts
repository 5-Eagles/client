import { BaseContract, Contract, ContractRunner } from 'ethers';

export interface MockUSDTContract extends BaseContract {
  balanceOf(account: string): Promise<bigint>;
  approve(spender: string, amount: bigint): Promise<any>;
  transfer(to: string, amount: bigint): Promise<any>;
}

export interface ServiceProviderContract extends BaseContract {
  sendTokensToProvider(amount: bigint): Promise<any>;
  sendTokensToUser(user: string, amount: bigint): Promise<any>;
  getContractBalance(): Promise<bigint>;
  getAddress(): Promise<string>;
}
