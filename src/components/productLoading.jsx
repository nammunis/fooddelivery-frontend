"use client";

import { m, LazyMotion, domMin } from "motion/react";

export function ProductLoader({ className }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 p-8 ${className || ""}`}>
      <LazyMotion features={domMin} strict>
        {/* Spinner Container */}
        <div className="relative w-16 h-16">
          {/* Outer Ring - Orange */}
          <m.span
            className="absolute inset-0 rounded-full border-4 border-transparent border-r-orange-500 border-t-orange-500"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner Ring - White */}
          <m.span
            className="absolute inset-2 rounded-full border-4 border-transparent border-b-white border-l-white"
            animate={{ rotate: -360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Pulsing Text */}
        <m.p
          className="text-orange-500 font-medium tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Loading product...
        </m.p>
      </LazyMotion>
    </div>
  );
}