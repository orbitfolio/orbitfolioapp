export async function fetchStockPrice(symbol: string, market: string) {
  try {
    return {
      symbol,
      price: 0,
      change: 0,
      changePercent: 0,
    }
  } catch (error) {
    console.error('Error fetching stock price:', error)
    return null
  }
}

export async function fetchCryptoPrice(symbol: string) {
  try {
    return {
      symbol,
      price: 0,
      change: 0,
      changePercent: 0,
    }
  } catch (error) {
    console.error('Error fetching crypto price:', error)
    return null
  }
}

export async function fetchMutualFundPrice(fundCode: string, country: string) {
  try {
    return {
      fundCode,
      nav: 0,
      change: 0,
      changePercent: 0,
    }
  } catch (error) {
    console.error('Error fetching mutual fund price:', error)
    return null
  }
}