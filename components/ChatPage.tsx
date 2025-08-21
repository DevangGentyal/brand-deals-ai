"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import type { Deal, ChatMessage } from "../types"
import { Bot, User, Send, Briefcase } from "lucide-react"

interface ChatPageProps {
  deal?: Deal
}

interface ActionButton {
  id: string
  label: string
  query: string
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

  const getActionButtons = (messageContent: string): ActionButton[] => {
    return [
      { id: "draft", label: "Draft Response", query: "Draft a professional response to this opportunity" },
      { id: "analyze", label: "Analyze Terms", query: "Analyze the contract terms and requirements" },
      { id: "negotiate", label: "Suggest Negotiation", query: "What negotiation points should I consider?" },
      { id: "timeline", label: "Create Timeline", query: "Create a project timeline for this collaboration" },
    ]
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleActionClick = (query: string) => {
    setInputValue(query)
    handleSendMessage(query)
  }

  const handleSendMessage = async (customMessage?: string) => {
    const messageText = customMessage || inputValue
    if (!messageText.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
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
        content: `Based on your question about "${messageText}", I can help you with that. For the ${deal?.title} project, I recommend focusing on the key deliverables and timeline. Here's my detailed analysis and recommendations for moving forward with this collaboration opportunity.`,
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
          <Bot className="w-16 h-16 text-muted-foreground" />
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
          <div className="deal-details">
            <h3 className="deal-name">{deal.title}</h3>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={message.id} className="message-wrapper">
            <div className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === "ai" ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
              </div>
              <div className="message-content">
                <div className="message-text" style={{background:"none"}}>{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>

            {message.type === "ai" && index === messages.length - 1 && !isTyping && (
              <div className="action-buttons">
                {getActionButtons(message.content).map((action) => (
                  <button
                    key={action.id}
                    className="action-suggestion-btn text-slate-100"
                    onClick={() => handleActionClick(action.query)}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="message-wrapper">
            <div className="message ai typing">
              <div className="message-avatar">
                <Bot className="w-6 h-6" />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
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
          <button className="send-button" onClick={() => handleSendMessage()} disabled={!inputValue.trim()}>
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
