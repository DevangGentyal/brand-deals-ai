"use client"

import { useState } from "react"
import { Sidebar } from "./components/Sidebar"
import { HomePage } from "./components/HomePage"
import { ChatPage } from "./components/ChatPage"
import type { Deal } from "./types"
import "./App.css"

export interface AppState {
  currentPage: "home" | "chat"
  currentChatDeal: string | null
  activatedDeals: Deal[]
  homeState: "initial" | "scanning" | "results"
  deals: Deal[]
}

function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: "home",
    currentChatDeal: null,
    activatedDeals: [],
    homeState: "initial",
    deals: [],
  })

  const handleScanDeals = () => {
    setAppState((prev) => ({ ...prev, homeState: "scanning" }))

    // Simulate scanning process
    setTimeout(() => {
      const mockDeals: Deal[] = [
        {
          id: "1",
          title: "Eco-Friendly Cottage Construction",
          description:
            "Looking for sustainable building materials and eco-conscious construction partners for a luxury cottage project.",
          budget: "$45K",
          date: "2 hours ago",
          brand: "GreenBuild Co.",
          category: "Construction",
          isActivated: false,
        },
        {
          id: "2",
          title: "Smart Home Automation",
          description: "Seeking tech partners for IoT integration in modern residential projects.",
          budget: "$28K",
          date: "4 hours ago",
          brand: "TechHomes",
          category: "Technology",
          isActivated: false,
        },
        {
          id: "3",
          title: "Modular Housing Development",
          description: "Partnership opportunity for innovative modular housing solutions.",
          budget: "$75K",
          date: "6 hours ago",
          brand: "ModularLiving",
          category: "Real Estate",
          isActivated: false,
        },
      ]

      setAppState((prev) => ({
        ...prev,
        homeState: "results",
        deals: mockDeals,
      }))
    }, 3000)
  }

  const handleDealToggle = (dealId: string) => {
    setAppState((prev) => {
      const deal = prev.deals.find((d) => d.id === dealId)
      if (!deal) return prev

      const updatedDeals = prev.deals.map((d) => (d.id === dealId ? { ...d, isActivated: !d.isActivated } : d))

      const updatedActivatedDeals = deal.isActivated
        ? prev.activatedDeals.filter((d) => d.id !== dealId)
        : [...prev.activatedDeals, { ...deal, isActivated: true }]

      return {
        ...prev,
        deals: updatedDeals,
        activatedDeals: updatedActivatedDeals,
      }
    })
  }

  const handleChatSelect = (dealId: string) => {
    setAppState((prev) => ({
      ...prev,
      currentPage: "chat",
      currentChatDeal: dealId,
    }))
  }

  const handleHomeSelect = () => {
    setAppState((prev) => ({
      ...prev,
      currentPage: "home",
      currentChatDeal: null,
    }))
  }

  return (
    <div className="app">
      <Sidebar
        activatedDeals={appState.activatedDeals}
        currentPage={appState.currentPage}
        currentChatDeal={appState.currentChatDeal}
        onChatSelect={handleChatSelect}
        onHomeSelect={handleHomeSelect}
      />

      <main className="main-content">
        {appState.currentPage === "home" ? (
          <HomePage
            state={appState.homeState}
            deals={appState.deals}
            onScanDeals={handleScanDeals}
            onDealToggle={handleDealToggle}
          />
        ) : (
          <ChatPage deal={appState.activatedDeals.find((d) => d.id === appState.currentChatDeal)} />
        )}
      </main>
    </div>
  )
}

export default App
