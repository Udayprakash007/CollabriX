import { useState, useEffect } from "react";
import logo from "@/assets/collabrix-logo.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [stage, setStage] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    // Enter animation complete, show logo
    const enterTimer = setTimeout(() => setStage("visible"), 100);
    
    // Start exit animation
    const visibleTimer = setTimeout(() => setStage("exit"), 2000);
    
    // Complete splash
    const exitTimer = setTimeout(() => onComplete(), 2800);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(visibleTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        stage === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 transition-all duration-1000 ease-out ${
            stage === "enter" ? "scale-0" : "scale-100"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-primary/10 transition-all duration-700 delay-200 ease-out ${
            stage === "enter" ? "scale-0" : "scale-100"
          }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-primary/15 transition-all duration-500 delay-300 ease-out ${
            stage === "enter" ? "scale-0" : "scale-100"
          }`}
        />
      </div>

      {/* Logo container */}
      <div
        className={`relative z-10 flex flex-col items-center transition-all duration-700 ease-out ${
          stage === "enter"
            ? "opacity-0 scale-75 translate-y-8"
            : stage === "exit"
            ? "opacity-0 scale-110 -translate-y-4"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Logo with pulse effect */}
        <div className="relative">
          <img
            src={logo}
            alt="CollabriX"
            className="w-64 h-auto drop-shadow-2xl"
          />
          
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-primary/20 blur-3xl rounded-full transition-opacity duration-1000 ${
              stage === "visible" ? "opacity-100 animate-pulse" : "opacity-0"
            }`}
          />
        </div>

        {/* Tagline */}
        <p
          className={`mt-6 text-muted-foreground text-lg font-medium tracking-wide transition-all duration-500 delay-500 ${
            stage === "enter" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          Connect. Collaborate. Create.
        </p>

        {/* Loading indicator */}
        <div
          className={`mt-8 flex gap-2 transition-all duration-500 delay-700 ${
            stage === "enter" ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
};
