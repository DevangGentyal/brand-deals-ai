"use client"

import type React from "react"
import type { Deal } from "../types"

interface SidebarProps {
  activatedDeals: Deal[]
  currentPage: "home" | "chat"
  currentChatDeal: string | null
  onChatSelect: (dealId: string) => void
  onHomeSelect: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  activatedDeals,
  currentPage,
  currentChatDeal,
  onChatSelect,
  onHomeSelect,
}) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">🤖</div>
          <span className="logo-text">IdeaPilot AI</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <button className={`nav-item ${currentPage === "home" ? "active" : ""}`} onClick={onHomeSelect}>
          <span className="nav-icon">🏠</span>
          <span className="nav-text">Home</span>
        </button>

        <button className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-text">Setup</span>
        </button>

        {activatedDeals.length > 0 && (
          <div className="deals-section">
            <div className="section-header">Active Deals</div>
            {activatedDeals.map((deal) => (
              <button
                key={deal.id}
                className={`nav-item deal-item ${currentChatDeal === deal.id ? "active" : ""}`}
                onClick={() => onChatSelect(deal.id)}
              >
                <span className="nav-icon">💼</span>
                <span className="nav-text">{deal.title}</span>
                <div className="deal-status"></div>
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item profile">
          <span className="nav-icon">👤</span>
          <span className="nav-text">Profile</span>
        </button>
      </div>
    </aside>
  )
}
