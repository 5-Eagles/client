export interface TokenBalance {
  balance: string; // Raw balance in smallest unit (e.g., "1000000" for 1 USDT)
  formattedBalance: string; // Human readable balance (e.g., "1.0" for 1 USDT)
}

export interface WalletOperation {
  success: boolean;
  message: string;
  txHash?: string; // Transaction hash when available
}

export interface WalletInfo {
  wallet_address: string;
  wallet_private_key_encrypted?: string;
}

export interface TokenTransferParams {
  amount: string; // Amount in token's smallest unit
  to?: string; // Optional recipient address
}

export interface TokenApprovalParams {
  spender: string;
  amount: string;
}

// API Response types
export interface BalanceResponse extends TokenBalance {
  error?: string;
}

export interface TransferResponse extends WalletOperation {
  error?: string;
}

// Error types
export interface WalletError {
  code: string;
  message: string;
  details?: unknown;
}

// State types for the WalletManager component
export interface WalletState {
  balance: TokenBalance | null;
  loading: boolean;
  error: string | null;
  pendingTx: string | null;
}
