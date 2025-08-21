"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Deal, ChatMessage } from "../types"

interface ChatPageProps {
  deal?: Deal
}

export const ChatPage: React.FC<ChatPageProps> = ({ deal }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      content: `I'm now handling the "${deal?.title}" collaboration opportunity. I've analyzed the initial requirements and I'm ready to help you navigate this deal. What would you like to know or discuss about this opportunity?`,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `Based on your question about "${inputValue}", I can help you with that. For the ${deal?.title} project, I recommend focusing on the key deliverables and timeline. Would you like me to draft a response to the brand or analyze the contract terms?`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!deal) {
    return (
      <div className="chat-page no-deal">
        <div className="no-deal-content">
          <div className="no-deal-icon">🤖</div>
          <h2>No Deal Selected</h2>
          <p>Select an activated deal from the sidebar to start chatting with AI</p>
        </div>
      </div>
    )
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div className="deal-info">
          <div className="deal-avatar">💼</div>
          <div className="deal-details">
            <h3 className="deal-name">{deal.title}</h3>
            <div className="deal-status">
              <span className="status-indicator active"></span>
              <span>AI Agent Active</span>
            </div>
          </div>
        </div>

        <div className="chat-actions">
          <button className="action-btn">
            <span>📋</span>
            Summary
          </button>
          <button className="action-btn">
            <span>📧</span>
            Draft Email
          </button>
          <button className="action-btn">
            <span>📊</span>
            Analytics
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            <div className="message-avatar">{message.type === "ai" ? "🤖" : "👤"}</div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message ai typing">
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <div className="input-container">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask AI about this deal, request actions, or get insights..."
            className="message-input"
            rows={1}
          />
          <button className="send-button" onClick={handleSendMessage} disabled={!inputValue.trim()}>
            <span>🚀</span>
          </button>
        </div>
      </div>
    </div>
  )
}
