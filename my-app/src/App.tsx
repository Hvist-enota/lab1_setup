import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState<number[]>([])

  const applyMove = (value: number) => {
    setScore((prev) => Math.max(0, prev + value))
    setMoves((prev) => [value, ...prev].slice(0, 6))
  }

  const resetSession = () => {
    setScore(0)
    setMoves([])
  }

  const tier = useMemo(() => {
    if (score >= 60) return 'Legend Tier'
    if (score >= 35) return 'Hot Streak'
    if (score >= 15) return 'Momentum'
    return 'Warmup'
  }, [score])

  const nextMilestone = useMemo(() => {
    if (score < 15) return 15
    if (score < 35) return 35
    if (score < 60) return 60
    return 100
  }, [score])

  const progress = Math.min(100, Math.round((score / nextMilestone) * 100))

  return (
    <main className="dashboard">
      <header className="hero">
        <p className="kicker">Daily Challenge Board</p>
        <h1>Focus Sprint Tracker</h1>
        <p className="subtitle">Build points, keep momentum, and hit the next tier.</p>
      </header>

      <section className="score-card">
        <div className="score-head">
          <p>Current Score</p>
          <span className="tier">{tier}</span>
        </div>

        <div className="score-value">{score}</div>

        <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <p className="milestone">Next milestone: {nextMilestone} points</p>
      </section>

      <section className="actions">
        <button className="btn btn-primary" onClick={() => applyMove(1)}>
          +1 Step
        </button>
        <button className="btn btn-accent" onClick={() => applyMove(5)}>
          +5 Burst
        </button>
        <button className="btn btn-muted" onClick={() => applyMove(-1)}>
          -1 Break
        </button>
        <button className="btn btn-ghost" onClick={resetSession}>
          Reset Session
        </button>
      </section>

      <section className="history">
        <h2>Recent Moves</h2>

        {moves.length === 0 ? (
          <p className="history-empty">No moves yet. Start with +1 Step.</p>
        ) : (
          <ul>
            {moves.map((move, index) => (
              <li key={`${move}-${index}`}>
                <span>{move > 0 ? 'Gain' : 'Drop'}</span>
                <strong>{move > 0 ? `+${move}` : move}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
