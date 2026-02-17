export type TokenBalance = {
  denom: string
  symbol: string
  amount: string
}

export async function getBalances(address: string): Promise<TokenBalance[]> {
  void address
  // Phase 2: mocked data — we’ll wire real TokenChain later
  return [
    { denom: 'uttt', symbol: 'TTT', amount: '123.45' },
    { denom: 'uwheat', symbol: 'WHEAT', amount: '42.00' },
  ]
}

export async function sendToken(args: {
  fromAddress: string
  toAddress: string
  denom: string
  amount: string
}): Promise<{ ok: true; txHash: string }> {
  void args
  // stub for now
  return { ok: true, txHash: 'MOCK_TX_HASH' }
}
