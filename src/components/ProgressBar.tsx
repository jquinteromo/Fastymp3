import { useEffect, useState } from 'react';

export default function ProgressBar({ timeEstimate = 7000, color = 'blue' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const step = timeEstimate / 100;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, step);

    return () => clearInterval(interval);
  }, [timeEstimate]);

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 mt-4 overflow-hidden">
      <div
        className={`h-full transition-all duration-100`}
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}
