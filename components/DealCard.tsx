"use client"

import type React from "react"
import type { Deal } from "../types"
import { Building2, Laptop, Home, Briefcase, Zap } from "lucide-react"

interface DealCardProps {
  deal: Deal
  onToggle: (dealId: string) => void
}

export const DealCard: React.FC<DealCardProps> = ({ deal, onToggle }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Construction":
        return <Building2 className="w-4 h-4" />
      case "Technology":
        return <Laptop className="w-4 h-4" />
      case "Real Estate":
        return <Home className="w-4 h-4" />
      default:
        return <Briefcase className="w-4 h-4" />
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
        <div className="deal-left">
            <div className="deal-brand">
              <Building2 className="w-4 h-4 brand-icon" style={{color:"#ffe0b8"}} />
              <span style={{color:"#ffe0b8"}}>{deal.brand}</span>
            </div>
          </div>
        <div className="deal-footer">
          
          <div className="deal-left">
            <div className="deal-budget minimized">
              <span className="budget-amount">{deal.budget}</span>
            </div>
          </div>

          <div className="deal-right">
            <button
              className={`activate-button ${deal.isActivated ? "active boost-animation" : "inactive"}`}
              onClick={() => onToggle(deal.id)}
            >
              <div className="button-content" style={{ width: "100%", display: "flex", gap: "10px" }}>
                <Zap className={`w-5 h-5 ${deal.isActivated ? "animate-pulse" : ""}`} />
                <span className="button-text">{deal.isActivated ? "AI Handling" : "Activate AI"}</span>
              </div>
              {deal.isActivated && <div className="boost-effect"></div>}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
