export type TokenBalance = {
  denom: string
  symbol: string
  amount: string
}

export async function getBalances(_address: string): Promise<TokenBalance[]> {
  // Phase 2: mocked data — we’ll wire real TokenChain later
  return [
    { denom: 'uttt', symbol: 'TTT', amount: '123.45' },
    { denom: 'uwheat', symbol: 'WHEAT', amount: '42.00' },
  ]
}

export async function sendToken(_args: {
  fromAddress: string
  toAddress: string
  denom: string
  amount: string
}): Promise<{ ok: true; txHash: string }> {
  // stub for now
  return { ok: true, txHash: 'MOCK_TX_HASH' }
}
