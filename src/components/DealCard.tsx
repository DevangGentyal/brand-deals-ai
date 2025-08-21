"use client"

import type React from "react"
import type { Deal } from "../types"

interface DealCardProps {
  deal: Deal
  onToggle: (dealId: string) => void
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onToggle }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Construction":
        return "🏗️"
      case "Technology":
        return "💻"
      case "Real Estate":
        return "🏢"
      default:
        return "💼"
    }
  }

  return (
    <div className={`deal-card ${deal.isActivated ? "activated" : ""}`}>
      <div className="deal-header">
        <div className="deal-category">
          <span className="category-icon">{getCategoryIcon(deal.category)}</span>
          <span className="category-text">{deal.category}</span>
        </div>
        <div className="deal-date">{deal.date}</div>
      </div>

      <div className="deal-content">
        <h3 className="deal-title">{deal.title}</h3>
        <p className="deal-description">{deal.description}</p>

        <div className="deal-meta">
          <div className="deal-brand">
            <span className="brand-icon">🏢</span>
            <span>{deal.brand}</span>
          </div>
          <div className="deal-budget">
            <span className="budget-icon">💰</span>
            <span>{deal.budget}</span>
          </div>
        </div>
      </div>

      <div className="deal-actions">
        <button className={`toggle-button ${deal.isActivated ? "active" : ""}`} onClick={() => onToggle(deal.id)}>
          <div className="toggle-track">
            <div className="toggle-thumb">{deal.isActivated ? "🤖" : "⏸️"}</div>
          </div>
          <span className="toggle-label">{deal.isActivated ? "AI Handling" : "Activate AI"}</span>
        </button>
      </div>
    </div>
  )
}
