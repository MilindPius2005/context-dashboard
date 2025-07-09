import React from 'react'
import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react'

const Settings = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure your context engineering dashboard</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-2">
              {[
                { icon: User, label: 'Profile', active: true },
                { icon: Bell, label: 'Notifications' },
                { icon: Shield, label: 'Security' },
                { icon: Palette, label: 'Appearance' },
                { icon: SettingsIcon, label: 'Advanced' },
              ].map((item, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue="Context Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  defaultValue="engineer@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  className="input-field"
                  defaultValue="AI Research Lab"
                />
              </div>
            </div>
          </div>

          {/* Token Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Token Management</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Context Window Size
                </label>
                <select className="input-field">
                  <option value="4096">4,096 tokens</option>
                  <option value="8192">8,192 tokens</option>
                  <option value="16384">16,384 tokens</option>
                  <option value="32768">32,768 tokens</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token Usage Alert Threshold
                </label>
                <input
                  type="number"
                  className="input-field"
                  defaultValue="80"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">Percentage of context window usage before alert</p>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="auto-optimize"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  defaultChecked
                />
                <label htmlFor="auto-optimize" className="text-sm text-gray-700">
                  Enable automatic context optimization
                </label>
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">API Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OpenAI API Key
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="sk-..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Model
                </label>
                <select className="input-field">
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  defaultValue="0.7"
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Focused (0)</span>
                  <span>Balanced (1)</span>
                  <span>Creative (2)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="btn-primary">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings