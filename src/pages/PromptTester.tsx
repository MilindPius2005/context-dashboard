import React, { useState, useEffect } from 'react'
import { MessageSquare, Play, Save, Copy, RotateCcw, Zap, TrendingUp, Lightbulb } from 'lucide-react'
import { countTokens, countTokensDetailed, optimizePrompt } from '../utils/tokenCounter'
import { testPrompt, APIConfig } from '../utils/api'
import { saveTestResult, loadTestResults, loadSettings } from '../utils/storage'

const PromptTester = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [tokenInfo, setTokenInfo] = useState({ tokens: 0, words: 0, characters: 0, efficiency: 0 })
  const [testResults, setTestResults] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({})
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [showOptimization, setShowOptimization] = useState(false)

  useEffect(() => {
    // Load saved test results and settings
    setTestResults(loadTestResults())
    setSettings(loadSettings())
  }, [])

  useEffect(() => {
    // Update token info when prompt changes
    if (prompt) {
      const info = countTokensDetailed(prompt)
      setTokenInfo(info)
      
      // Auto-optimize if enabled
      if (settings.autoOptimize && info.tokens > 500) {
        const optimized = optimizePrompt(prompt, 500)
        setOptimizedPrompt(optimized)
        setShowOptimization(true)
      }
    } else {
      setTokenInfo({ tokens: 0, words: 0, characters: 0, efficiency: 0 })
      setOptimizedPrompt('')
      setShowOptimization(false)
    }
  }, [prompt, settings.autoOptimize])

  const handleTestPrompt = async () => {
    if (!prompt.trim()) return
    
    setIsLoading(true)
    setResponse('')
    
    try {
      const config: APIConfig = {
        apiKey: settings.apiKey || 'demo',
        model: settings.model || 'gpt-4',
        temperature: settings.temperature || 0.7,
        maxTokens: settings.maxTokens || 1000
      }
      
      const result = await testPrompt(prompt, config)
      setResponse(result.text)
      
      // Save test result
      const savedResult = saveTestResult({
        prompt,
        response: result.text,
        tokens: result.tokens,
        responseTime: result.responseTime,
        quality: result.quality
      })
      
      // Update test results list
      setTestResults(prev => [savedResult, ...prev.slice(0, 9)])
      
    } catch (error) {
      setResponse(`Error: ${error}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptimize = () => {
    if (optimizedPrompt) {
      setPrompt(optimizedPrompt)
      setShowOptimization(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleReset = () => {
    setPrompt('')
    setResponse('')
    setOptimizedPrompt('')
    setShowOptimization(false)
  }

  const promptTemplates = [
    { 
      name: 'Code Review', 
      content: 'Please review this code and suggest improvements for readability, performance, and best practices:\n\n[Your code here]',
      category: 'Programming'
    },
    { 
      name: 'Content Summary', 
      content: 'Please provide a concise summary of the following text, highlighting the key points:\n\n[Your text here]',
      category: 'Writing'
    },
    { 
      name: 'Problem Solving', 
      content: 'I need help solving this problem. Please break it down into steps and provide a solution:\n\n[Your problem here]',
      category: 'Analysis'
    },
    { 
      name: 'Creative Writing', 
      content: 'Please help me write a creative story based on this prompt:\n\n[Your story prompt here]',
      category: 'Creative'
    },
    { 
      name: 'Data Analysis', 
      content: 'Please analyze this data and provide insights:\n\n[Your data here]',
      category: 'Analysis'
    },
    { 
      name: 'Translation', 
      content: 'Please translate the following text to [target language]:\n\n[Your text here]',
      category: 'Language'
    },
  ]

  const recentResults = testResults.slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Prompt Tester</h1>
        <p className="text-gray-600">Test and optimize your prompts for better performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Prompt Input */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Prompt Input</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCopy(prompt)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy prompt"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button 
                onClick={handleReset}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Enter your prompt here..."
          />
          
          {/* Token Info */}
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Tokens: <span className="font-medium text-gray-900">{tokenInfo.tokens}</span></span>
              <span className="text-gray-600">Words: <span className="font-medium text-gray-900">{tokenInfo.words}</span></span>
              <span className="text-gray-600">Characters: <span className="font-medium text-gray-900">{tokenInfo.characters}</span></span>
            </div>
            {tokenInfo.efficiency > 0 && (
              <div className="mt-2">
                <span className="text-gray-600 text-sm">Efficiency: </span>
                <span className={`font-medium ${tokenInfo.efficiency > 1 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {tokenInfo.efficiency.toFixed(2)} words/token
                </span>
              </div>
            )}
          </div>

          {/* Optimization Suggestion */}
          {showOptimization && optimizedPrompt && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800">Optimization Available</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your prompt can be optimized to use fewer tokens while maintaining effectiveness.
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={handleOptimize}
                      className="btn-primary text-sm py-1 px-3"
                    >
                      Apply Optimization
                    </button>
                    <button
                      onClick={() => setShowOptimization(false)}
                      className="btn-secondary text-sm py-1 px-3"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleTestPrompt}
              disabled={!prompt.trim() || isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="w-4 h-4" />
              <span>{isLoading ? 'Testing...' : 'Test Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Response Output */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Response</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => handleCopy(response)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy response"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCopy(prompt + '\n\n' + response)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy conversation"
              >
                <Save className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : response ? (
              <div>
                <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                {testResults[0] && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Response Time: </span>
                        <span className="font-medium">{testResults[0].responseTime}ms</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Quality Score: </span>
                        <span className="font-medium">{testResults[0].quality.toFixed(1)}/10</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Input Tokens: </span>
                        <span className="font-medium">{testResults[0].tokens.input}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Output Tokens: </span>
                        <span className="font-medium">{testResults[0].tokens.output}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Response will appear here after testing...</p>
            )}
          </div>
        </div>
      </div>

      {/* Prompt Templates */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prompt Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promptTemplates.map((template, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setPrompt(template.content)}
            >
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.category}</p>
              <p className="text-xs text-gray-500 mt-2">{template.content.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Test Results */}
      {recentResults.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Test Results</h3>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div key={result.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">{result.prompt.substring(0, 100)}...</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                    <span>{new Date(result.timestamp).toLocaleString()}</span>
                    <span>{result.tokens.total} tokens</span>
                    <span>{result.responseTime}ms</span>
                    <span>Quality: {result.quality.toFixed(1)}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPrompt(result.prompt)}
                  className="btn-secondary text-xs py-1 px-2"
                >
                  Reuse
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PromptTester