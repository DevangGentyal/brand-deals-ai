import type React from "react"

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="loading-animation">
      <div className="scanning-radar">
        <div className="radar-sweep"></div>
        <div className="radar-dot dot-1"></div>
        <div className="radar-dot dot-2"></div>
        <div className="radar-dot dot-3"></div>
      </div>

      <div className="scanning-particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>
    </div>
  )
}
