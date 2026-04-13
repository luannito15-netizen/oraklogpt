// 3D-style flame icon with gradient fill — used exclusively for HOT events
export function FlameIcon3D({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id="flame-core" cx="50%" cy="75%" r="55%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="35%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id="flame-tip" cx="50%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <radialGradient id="flame-inner" cx="50%" cy="80%" r="40%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer flame body */}
      <path
        d="M20 2C20 2 28 12 28 20C28 22 27 24 26 25C27 22 24 18 22 20C26 14 20 6 20 2Z"
        fill="url(#flame-tip)"
        opacity="0.9"
      />
      <path
        d="M8 28C8 18 14 10 20 4C20 4 14 16 18 22C14 20 10 24 12 30C10 29 8 28.5 8 28Z"
        fill="url(#flame-tip)"
        opacity="0.7"
      />
      <path
        d="M32 28C32 18 28 12 24 8C24 8 28 18 26 24C30 22 34 26 32 32C33 31 32 29 32 28Z"
        fill="url(#flame-tip)"
        opacity="0.7"
      />

      {/* Main flame body */}
      <path
        d="M20 6C24 14 30 20 30 30C30 39.5 25.5 46 20 46C14.5 46 10 39.5 10 30C10 20 16 14 20 6Z"
        fill="url(#flame-core)"
      />

      {/* Inner bright core */}
      <path
        d="M20 28C22 24 24 26 24 30C24 34 22 38 20 40C18 38 16 34 16 30C16 26 18 24 20 28Z"
        fill="url(#flame-inner)"
        opacity="0.8"
      />

      {/* Specular highlight */}
      <ellipse cx="16" cy="26" rx="3" ry="5" fill="white" opacity="0.15" transform="rotate(-15 16 26)" />
    </svg>
  );
}
