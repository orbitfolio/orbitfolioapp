export interface Stock {
  id: string
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  market: 'India' | 'US' | 'Canada'
  createdAt: Date
  updatedAt: Date
}

export interface MutualFund {
  id: string
  fundCode: string
  fundName: string
  units: number
  avgNav: number
  currentNav: number
  country: 'India' | 'US' | 'Canada'
  createdAt: Date
  updatedAt: Date
}

export interface Crypto {
  id: string
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  createdAt: Date
  updatedAt: Date
}

export interface Alert {
  id: string
  assetType: 'stock' | 'mutualfund' | 'crypto'
  assetId: string
  targetPrice: number
  condition: 'above' | 'below'
  isActive: boolean
  createdAt: Date
}

export interface Portfolio {
  totalValue: number
  totalGain: number
  totalGainPercent: number
  stocks: Stock[]
  mutualFunds: MutualFund[]
  crypto: Crypto[]
}