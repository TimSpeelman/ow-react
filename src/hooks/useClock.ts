import { useEffect, useState } from "react";

export function useClock(millisPerTick: number) {
    const [time, setTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), millisPerTick);
        return () => clearInterval(interval);
    }, [millisPerTick])

    return time;
}
