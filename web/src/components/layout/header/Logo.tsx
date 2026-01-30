import clsx from "clsx";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={clsx("pointer-events-none select-none", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 150 60"
        fill="none"
        className="h-full"
      >
        {/* <!-- Background subtle gradient --> */}
        <defs>
          <linearGradient
            id="bgGrad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#1e1e2e"
            />
            <stop
              offset="100%"
              stopColor="#0f0f23"
            />
          </linearGradient>

          {/* <!-- Code block glow --> */}
          <filter
            id="glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1"
              floodColor="#3b82f6"
            />
          </filter>

          {/* <!-- Text glow --> */}
          <filter id="textGlow">
            <feGaussianBlur
              stdDeviation="1"
              result="coloredBlur"
            />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* <!-- Decorative code brackets --> */}
        <g filter="url(#glow)">
          {/* <!-- Left bracket --> */}
          <text
            x="0"
            y="45"
            fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            fontSize="48"
            fontWeight="400"
            fill="#3b82f6"
          >
            {"{"}
          </text>
          {/* <!-- Right bracket -->   */}
          <text
            x="125"
            y="45"
            fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            fontSize="48"
            fontWeight="400"
            fill="#3b82f6"
          >
            {"}"}
          </text>
        </g>

        {/* <!-- "Guess the" text --> */}
        <g filter="url(#textGlow)">
          <text
            x="40"
            y="20"
            fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            fontSize="14"
            fontWeight="600"
            className="fill-foreground"
          >
            Guess the
          </text>

          {/* <!-- "Output" main title with gradient --> */}
          <defs>
            <linearGradient
              id="titleGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#3b82f6"
              />
              <stop
                offset="50%"
                stopColor="#10b981"
              />
              <stop
                offset="100%"
                stopColor="#f59e0b"
              />
            </linearGradient>
          </defs>

          <text
            x="30"
            y="45"
            fontFamily="'JetBrains Mono', 'Fira Code', monospace"
            fontSize="28"
            fontWeight="800"
            fill="url(#titleGrad)"
            letterSpacing="-0.02em"
          >
            OUTPUT
          </text>
        </g>
      </svg>
    </div>
  );
}
