import { getLatestTraffic, TrafficRecord } from "@/services/api";
import { useEffect, useState } from "react";

export function useTrafficData(gymId: number | null) {
  const [traffic, setTraffic] = useState<TrafficRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gymId) return;

    let isActive = true;

    const fetchTraffic = async () => {
      try {
        if (!traffic) setLoading(true);
        const data = await getLatestTraffic(gymId);
        if (!isActive) return;
        setTraffic(data);
        setError(null);
      } catch (err) {
        if (!isActive) return;
        console.error("Error fetching latest traffic", err);
        setError("Failed to load traffic");
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    fetchTraffic();

    //polling every 30s
    const intervalMs = 1000; // for demo use
    //      Number(process.env.EXPO_PUBLIC_TRAFFIC_INTERVAL_MS) || 30000;

    const intervalId = setInterval(fetchTraffic, 1000); //This creates an automatic loop that runs fetch every 30 000ms -> 30s

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [gymId]);

  return { traffic, loading, error };
}
