export default function HoneyDripBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-70">
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="honey" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              className="text-primary-400"
              stopColor="currentColor"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              className="text-primary-500"
              stopColor="currentColor"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        {[...Array(10)].map((_, index) => (
          <path
            key={index}
            d={`M${index * 10},0 Q${index * 10 + 5},25 ${index * 10},50 T${index * 10},100`}
            fill="none"
            stroke="url(#honey)"
            strokeWidth="3"
          >
            <animate
              attributeName="d"
              dur={`${3 + index * 0.5}s`}
              repeatCount="indefinite"
              values={`
                M${index * 10},0 Q${index * 10 + 5},25 ${index * 10},50 T${index * 10},100;
                M${index * 10},0 Q${index * 10 - 5},25 ${index * 10},50 T${index * 10},100;
                M${index * 10},0 Q${index * 10 + 5},25 ${index * 10},50 T${index * 10},100
              `}
            />
          </path>
        ))}
      </svg>
    </div>
  )
}
