'use client'

interface StockCardProps {
  symbol: string
  name: string
  quantity: number
  currentPrice: number
  avgPrice: number
  market: 'India' | 'US' | 'Canada'
}

export default function StockCard({
  symbol,
  name,
  quantity,
  currentPrice,
  avgPrice,
  market,
}: StockCardProps) {
  const totalValue = quantity * currentPrice
  const totalCost = quantity * avgPrice
  const gain = totalValue - totalCost
  const gainPercentage = ((gain / totalCost) * 100).toFixed(2)
  const isPositive = gain >= 0

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{symbol}</h3>
          <p className="text-sm text-gray-600">{name}</p>
          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
            {market}
          </span>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${currentPrice.toFixed(2)}</p>
          <p className="text-sm text-gray-600">Qty: {quantity}</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-600">Total Value:</span>
          <span className="text-sm font-semibold">${totalValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Gain/Loss:</span>
          <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            ${Math.abs(gain).toFixed(2)} ({gainPercentage}%)
          </span>
        </div>
      </div>
    </div>
  )
}