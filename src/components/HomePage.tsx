"use client"

import type React from "react"
import type { Deal } from "../types"
import { DealCard } from "./DealCard"
import { LoadingAnimation } from "./LoadingAnimation"

interface HomePageProps {
  state: "initial" | "scanning" | "results"
  deals: Deal[]
  onScanDeals: () => void
  onDealToggle: (dealId: string) => void
}

export const HomePage: React.FC<HomePageProps> = ({ state, deals, onScanDeals, onDealToggle }) => {
  if (state === "initial") {
    return (
      <div className="home-page initial-state">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              AI-Powered Brand Collaboration
              <span className="gradient-text"> Agent</span>
            </h1>
            <p className="hero-subtitle">
              Automatically discover, analyze, and manage collaboration opportunities between brands and creators using
              advanced AI technology.
            </p>

            <button className="scan-button" onClick={onScanDeals}>
              <span className="scan-icon">🔍</span>
              <span>Scan for New Deals</span>
              <div className="scan-glow"></div>
            </button>
          </div>

          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">📧</div>
              <div className="card-text">Email Analysis</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🎯</div>
              <div className="card-text">Smart Matching</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">⚡</div>
              <div className="card-text">Auto Response</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (state === "scanning") {
    return (
      <div className="home-page scanning-state">
        <div className="scanning-content">
          <LoadingAnimation />
          <h2 className="scanning-title">Scanning Emails & Messages...</h2>
          <p className="scanning-subtitle">AI is analyzing your inbox for collaboration opportunities</p>
          <div className="scanning-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span className="progress-text">Analyzing patterns...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-page results-state">
      <div className="results-header">
        <div className="header-content">
          <h2 className="results-title">Found {deals.length} Collaboration Opportunities</h2>
          <p className="results-subtitle">AI has identified these potential deals from your recent communications</p>
        </div>

        <button className="rescan-button" onClick={onScanDeals}>
          <span>🔄</span>
          Scan Again
        </button>
      </div>

      <div className="deals-grid">
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onToggle={onDealToggle} />
        ))}
      </div>
    </div>
  )
}
