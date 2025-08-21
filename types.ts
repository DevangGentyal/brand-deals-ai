export interface Deal {
  id: string
  title: string
  description: string
  budget: string
  date: string
  brand: string
  category: string
  isActivated: boolean
}

export interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}
