import React from 'react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  Brain, 
  Hash, 
  MessageSquare, 
  TrendingUp,
  Clock,
  Zap
} from 'lucide-react'

const Dashboard = () => {
  // Sample data for charts
  const tokenUsageData = [
    { name: 'Mon', tokens: 1200, context: 800 },
    { name: 'Tue', tokens: 1800, context: 1200 },
    { name: 'Wed', tokens: 1400, context: 900 },
    { name: 'Thu', tokens: 2200, context: 1500 },
    { name: 'Fri', tokens: 1600, context: 1100 },
    { name: 'Sat', tokens: 900, context: 600 },
    { name: 'Sun', tokens: 1100, context: 700 },
  ]

  const contextDistribution = [
    { name: 'System Prompt', value: 35, color: '#3b82f6' },
    { name: 'User Input', value: 25, color: '#10b981' },
    { name: 'Conversation History', value: 30, color: '#f59e0b' },
    { name: 'Tools & Functions', value: 10, color: '#ef4444' },
  ]

  const stats = [
    {
      title: 'Total Tokens Used',
      value: '12,847',
      change: '+12%',
      icon: Hash,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Context Windows',
      value: '156',
      change: '+8%',
      icon: Brain,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Prompts Tested',
      value: '89',
      change: '+23%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Avg Response Time',
      value: '2.3s',
      change: '-5%',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your context engineering performance</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Zap className="w-4 h-4" />
          <span>Last updated: 2 minutes ago</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-1">from last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Usage Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Usage Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tokenUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tokens" fill="#3b82f6" name="Total Tokens" />
              <Bar dataKey="context" fill="#10b981" name="Context Tokens" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Context Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Context Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={contextDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {contextDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'New prompt template created', time: '2 minutes ago', type: 'prompt' },
            { action: 'Context window optimized', time: '15 minutes ago', type: 'context' },
            { action: 'Token usage limit reached', time: '1 hour ago', type: 'warning' },
            { action: 'Performance benchmark completed', time: '2 hours ago', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'prompt' ? 'bg-blue-500' :
                activity.type === 'context' ? 'bg-green-500' :
                activity.type === 'warning' ? 'bg-yellow-500' : 'bg-purple-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 