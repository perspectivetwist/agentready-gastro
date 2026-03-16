export default function SonarAnimation() {
  return (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 pointer-events-none">
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-yellow-400" />
      {/* Expanding rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/50 animate-sonar-ping"
          style={{
            width: '100%',
            height: '100%',
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  )
}
