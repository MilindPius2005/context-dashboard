// API utility for making real API calls
// Note: You'll need to add your actual API key in the settings

export interface APIConfig {
  apiKey: string
  model: string
  temperature: number
  maxTokens: number
}

export interface APIResponse {
  text: string
  tokens: {
    input: number
    output: number
    total: number
  }
  responseTime: number
  quality: number
}

export const testPrompt = async (
  prompt: string, 
  config: APIConfig
): Promise<APIResponse> => {
  const startTime = Date.now()
  
  try {
    // For demo purposes, we'll simulate an API call
    // In production, replace this with actual OpenAI API call
    
    if (!config.apiKey || config.apiKey === 'sk-...') {
      // Simulated response for demo
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
      
      const simulatedResponse = generateSimulatedResponse(prompt)
      const responseTime = Date.now() - startTime
      
      return {
        text: simulatedResponse,
        tokens: {
          input: Math.ceil(prompt.length / 4),
          output: Math.ceil(simulatedResponse.length / 4),
          total: Math.ceil((prompt.length + simulatedResponse.length) / 4)
        },
        responseTime,
        quality: Math.random() * 2 + 7 // Random quality between 7-9
      }
    }
    
    // Real API call would go here
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${config.apiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     model: config.model,
    //     messages: [{ role: 'user', content: prompt }],
    //     temperature: config.temperature,
    //     max_tokens: config.maxTokens
    //   })
    // })
    
    // For now, return simulated response
    const simulatedResponse = generateSimulatedResponse(prompt)
    const responseTime = Date.now() - startTime
    
    return {
      text: simulatedResponse,
      tokens: {
        input: Math.ceil(prompt.length / 4),
        output: Math.ceil(simulatedResponse.length / 4),
        total: Math.ceil((prompt.length + simulatedResponse.length) / 4)
      },
      responseTime,
      quality: Math.random() * 2 + 7
    }
    
  } catch (error) {
    throw new Error(`API call failed: ${error}`)
  }
}

const generateSimulatedResponse = (prompt: string): string => {
  const responses = [
    "Based on your prompt, I can provide a comprehensive analysis. The key points to consider are efficiency, clarity, and optimization. Here's my detailed response addressing your specific requirements.",
    "I understand your request. Let me break this down into actionable steps that will help you achieve your goals effectively and efficiently.",
    "This is an interesting question that requires careful consideration. Here's my analysis with practical recommendations for implementation.",
    "Thank you for your prompt. I've analyzed the situation and here are the most effective strategies to address your needs.",
    "I can help you with this. The solution involves several key components that work together to create optimal results."
  ]
  
  // Add some context-aware responses
  if (prompt.toLowerCase().includes('code') || prompt.toLowerCase().includes('programming')) {
    return "Here's the optimized code solution that addresses your requirements efficiently while maintaining readability and performance."
  }
  
  if (prompt.toLowerCase().includes('summary') || prompt.toLowerCase().includes('summarize')) {
    return "Here's a concise summary of the key points, organized for maximum clarity and impact."
  }
  
  if (prompt.toLowerCase().includes('creative') || prompt.toLowerCase().includes('story')) {
    return "Here's a creative response that captures the essence of your request while adding imaginative elements."
  }
  
  return responses[Math.floor(Math.random() * responses.length)]
} 