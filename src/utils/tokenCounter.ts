// Simple token counting utility
// This is an approximation - for production, use tiktoken or similar

export const countTokens = (text: string): number => {
  if (!text) return 0
  
  // Rough approximation: 1 token ≈ 4 characters for English text
  // This is a simplified version - real tokenizers are more complex
  const charCount = text.length
  const estimatedTokens = Math.ceil(charCount / 4)
  
  return estimatedTokens
}

export const countTokensDetailed = (text: string) => {
  const tokens = countTokens(text)
  const words = text.split(/\s+/).filter(word => word.length > 0).length
  const characters = text.length
  
  return {
    tokens,
    words,
    characters,
    efficiency: Math.round((words / tokens) * 100) / 100
  }
}

export const optimizePrompt = (prompt: string, maxTokens: number = 1000): string => {
  const currentTokens = countTokens(prompt)
  
  if (currentTokens <= maxTokens) {
    return prompt
  }
  
  // Simple optimization: remove extra whitespace and shorten sentences
  let optimized = prompt
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/\s+([.,!?])/g, '$1') // Remove spaces before punctuation
    .trim()
  
  // If still too long, truncate intelligently
  if (countTokens(optimized) > maxTokens) {
    const words = optimized.split(' ')
    let truncated = ''
    
    for (const word of words) {
      if (countTokens(truncated + ' ' + word) <= maxTokens) {
        truncated += (truncated ? ' ' : '') + word
      } else {
        break
      }
    }
    
    optimized = truncated
  }
  
  return optimized
} 