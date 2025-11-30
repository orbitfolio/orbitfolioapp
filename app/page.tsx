'use client'

import { useState } from 'react'
import { TrendingUp, DollarSign, PieChart, Bell } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-indigo-600">Orbitfolio</h1>
            <nav className="flex space-x-4">
              <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Dashboard</button>
              <button onClick={() => setActiveTab('holdings')} className={`px-4 py-2 rounded-lg ${activeTab === 'holdings' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Holdings</button>
              <button onClick={() => setActiveTab('alerts')} className={`px-4 py-2 rounded-lg ${activeTab === 'alerts' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>Alerts</button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">$0.00</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Gain/Loss</p>
                <p className="text-2xl font-bold text-green-600">+$0.00</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Holdings</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <PieChart className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Alerts</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <Bell className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Orbitfolio</h2>
          <p className="text-lg text-gray-600 mb-6">Your comprehensive portfolio tracking solution</p>
        </div>
      </div>
    </main>
  )
}