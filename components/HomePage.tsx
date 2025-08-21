"use client"

import type React from "react"
import type { Deal } from "../types"
import { DealCard } from "./DealCard"
import { LoadingAnimation } from "./LoadingAnimation"
import { Search, RotateCcw } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text3D, Center } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"
import Hero from "./Hero";

function AnimatedTorus() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.3
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        emissive="#4c1d95"
        emissiveIntensity={0.2}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingText() {
  const textRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      textRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }
  })

  return (
    <group ref={textRef} position={[0, -2, 0]}>
      <Center>
        <Text3D font="/fonts/Inter_Bold.json" size={0.3} height={0.1} curveSegments={12}>
          AI AGENT
          <meshStandardMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.3} />
        </Text3D>
      </Center>
    </group>
  )
}

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
              <Search className="w-5 h-5" />
              <span>Scan for New Deals</span>
              <div className="scan-glow"></div>
            </button>
          </div>

          <div className="hero-visual">
             <Hero />

            {/*
            <div className="floating-card card-1 enhanced">
              <Mail className="w-6 h-6 card-icon" />
              <div className="card-text">Email Analysis</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-2 enhanced">
              <Target className="w-6 h-6 card-icon" />
              <div className="card-text">Smart Matching</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-3 enhanced">
              <Zap className="w-6 h-6 card-icon" />
              <div className="card-text">Auto Response</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-4 enhanced">
              <Brain className="w-6 h-6 card-icon" />
              <div className="card-text">AI Learning</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-5 enhanced">
              <Zap className="w-6 h-6 card-icon" />
              <div className="card-text">Magic Insights</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-6 enhanced">
              <Shield className="w-6 h-6 card-icon" />
              <div className="card-text">Secure Processing</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-7 enhanced">
              <Rocket className="w-6 h-6 card-icon" />
              <div className="card-text">Fast Deployment</div>
              <div className="card-shine"></div>
            </div>
            <div className="floating-card card-8 enhanced">
              <Globe className="w-6 h-6 card-icon" />
              <div className="card-text">Global Reach</div>
              <div className="card-shine"></div>
            </div>
            */}
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

        <button className="rescan-button distinctive" onClick={onScanDeals}>
          <RotateCcw className="w-4 h-4" />
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
