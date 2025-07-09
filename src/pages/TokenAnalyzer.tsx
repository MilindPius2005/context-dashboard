import React from 'react'
import { Hash, TrendingUp, AlertTriangle, Info } from 'lucide-react'

const TokenAnalyzer = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Token Analyzer</h1>
        <p className="text-gray-600">Analyze token usage patterns and optimize efficiency</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Usage Analysis</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Input Tokens</span>
              </div>
              <span className="text-lg font-bold text-blue-600">1,247</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-green-600" />
                <span className="font-medium">Output Tokens</span>
              </div>
              <span className="text-lg font-bold text-green-600">892</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Hash className="w-5 h-5 text-purple-600" />
                <span className="font-medium">Total Tokens</span>
              </div>
              <span className="text-lg font-bold text-purple-600">2,139</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Efficiency Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Token Efficiency</span>
              <span className="text-sm font-medium text-green-600">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Context Utilization</span>
              <span className="text-sm font-medium text-blue-600">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '72%' }}></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cost Optimization</span>
              <span className="text-sm font-medium text-purple-600">91%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">High Token Usage Detected</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Your system prompt is using 45% more tokens than recommended. Consider shortening it by 200 tokens.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-800">Efficiency Improvement</h4>
              <p className="text-sm text-green-700 mt-1">
                Your context management has improved by 15% this week. Keep up the good work!
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800">Potential Savings</h4>
              <p className="text-sm text-blue-700 mt-1">
                You could save approximately 30% on token costs by implementing the suggested optimizations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokenAnalyzer 