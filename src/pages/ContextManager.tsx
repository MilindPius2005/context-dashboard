import React, { useState, useEffect } from 'react'
import { Brain, Plus, Settings, Trash2, Edit, Save, X } from 'lucide-react'
import { countTokens } from '../utils/tokenCounter'
import { loadContexts, addContext, updateContext, deleteContext, SavedContext } from '../utils/storage'

const ContextManager = () => {
  const [contexts, setContexts] = useState<SavedContext[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingContext, setEditingContext] = useState<SavedContext | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    isActive: true
  })

  useEffect(() => {
    // Load saved contexts
    setContexts(loadContexts())
  }, [])

  const handleSaveContext = () => {
    if (!formData.name.trim() || !formData.content.trim()) return

    const tokens = countTokens(formData.content)
    
    if (editingContext) {
      // Update existing context
      const updated = updateContext(editingContext.id, {
        ...formData,
        tokens
      })
      if (updated) {
        setContexts(loadContexts())
        setEditingContext(null)
      }
    } else {
      // Add new context
      const newContext = addContext({
        ...formData,
        tokens
      })
      setContexts(prev => [...prev, newContext])
    }
    
    setShowAddModal(false)
    setEditingContext(null)
    setFormData({
      name: '',
      description: '',
      content: '',
      priority: 'medium',
      isActive: true
    })
  }

  const handleEdit = (context: SavedContext) => {
    setEditingContext(context)
    setFormData({
      name: context.name,
      description: context.description,
      content: context.content,
      priority: context.priority,
      isActive: context.isActive
    })
    setShowAddModal(true)
  }

  const handleDelete = (id: string) => {
    if (deleteContext(id)) {
      setContexts(loadContexts())
    }
  }

  const handleToggleActive = (context: SavedContext) => {
    const updated = updateContext(context.id, { isActive: !context.isActive })
    if (updated) {
      setContexts(loadContexts())
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Context Manager</h1>
          <p className="text-gray-600">Manage and optimize your context windows</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Context</span>
        </button>
      </div>

      {/* Context Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active Contexts</p>
              <p className="text-2xl font-bold text-gray-900">
                {contexts.filter(c => c.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <Settings className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tokens</p>
              <p className="text-2xl font-bold text-gray-900">
                {contexts.reduce((sum, c) => sum + c.tokens, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Context Size</p>
              <p className="text-2xl font-bold text-gray-900">
                {contexts.length > 0 ? Math.round(contexts.reduce((sum, c) => sum + c.tokens, 0) / contexts.length) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Context List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Context Windows</h3>
        {contexts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No contexts created yet. Create your first context to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contexts.map((context) => (
              <div
                key={context.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-medium text-gray-900">{context.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      context.priority === 'high' ? 'bg-red-100 text-red-700' :
                      context.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {context.priority}
                    </span>
                    <button
                      onClick={() => handleToggleActive(context)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        context.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {context.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{context.description}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{context.tokens} tokens</span>
                    <span>Created: {new Date(context.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEdit(context)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Edit context"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(context.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete context"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Context Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingContext ? 'Edit Context' : 'Add New Context'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingContext(null)
                  setFormData({
                    name: '',
                    description: '',
                    content: '',
                    priority: 'medium',
                    isActive: true
                  })
                }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Context Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="input-field"
                  placeholder="Enter context name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="input-field"
                  placeholder="Describe the context purpose"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Context Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="input-field"
                  rows={6}
                  placeholder="Enter the context content (system prompt, instructions, etc.)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {countTokens(formData.content)} tokens
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as 'high' | 'medium' | 'low' }))}
                    className="input-field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Active
                  </label>
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingContext(null)
                    setFormData({
                      name: '',
                      description: '',
                      content: '',
                      priority: 'medium',
                      isActive: true
                    })
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContext}
                  disabled={!formData.name.trim() || !formData.content.trim()}
                  className="btn-primary flex-1 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingContext ? 'Update' : 'Add'} Context</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContextManager