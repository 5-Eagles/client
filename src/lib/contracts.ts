import { Contract, ContractRunner, ethers } from 'ethers';
import MockUSDTAbi from '../abi/MockUSDT.json';
import ServiceProviderAbi from '../abi/ServiceProvider.json';
import { MockUSDTContract, ServiceProviderContract } from '@/types/contracts';

export const getProvider = () => {
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL);
};

export const getTokenContract = (
  provider: ContractRunner
): MockUSDTContract => {
  return new Contract(
    process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!,
    MockUSDTAbi.abi,
    provider
  ) as unknown as MockUSDTContract;
};

export const getServiceContract = (
  provider: ContractRunner
): ServiceProviderContract => {
  return new Contract(
    process.env.NEXT_PUBLIC_SERVICE_CONTRACT_ADDRESS!,
    ServiceProviderAbi.abi,
    provider
  ) as unknown as ServiceProviderContract;
};
