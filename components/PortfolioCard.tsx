'use client'

interface PortfolioCardProps {
  title: string
  value: string
  change: string
  changePercentage: string
  isPositive: boolean
}

export default function PortfolioCard({
  title,
  value,
  change,
  changePercentage,
  isPositive,
}: PortfolioCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
      <div className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {change} ({changePercentage})
      </div>
    </div>
  )
}