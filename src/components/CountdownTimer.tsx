"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  expiredMessage?: string;
  onExpire?: () => void;
}

export default function CountdownTimer({
  targetDate,
  expiredMessage = "Time's up!",
  onExpire,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTime = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        setIsExpired(true);
        if (onExpire) {
          onExpire();
        }
        return true; // expired
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
      return false; // not expired
    };

    // Initial check
    if (checkTime()) return;

    const interval = setInterval(() => {
      if (checkTime()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, onExpire]);

  if (!mounted) {
    // Prevent hydration mismatch
    return (
      <div className="flex justify-center items-center gap-2 md:gap-4 my-8 min-h-[140px] opacity-0"></div>
    );
  }

  if (isExpired) {
    return (
      <div className="text-center my-8 min-h-[140px] flex items-center justify-center">
        <p className="text-gold font-black uppercase tracking-widest text-xl animate-pulse">
          {expiredMessage}
        </p>
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-white/5 border border-white/10 rounded-2xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] shadow-lg backdrop-blur-sm">
      <span className="text-2xl md:text-4xl font-black text-white">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-xs text-gold uppercase mt-1 tracking-widest font-bold">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex justify-center items-center my-8 min-h-[140px]">
      <div className="flex gap-2 md:gap-4">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Mins" />
        <TimeBlock value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
}
