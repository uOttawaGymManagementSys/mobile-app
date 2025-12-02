import { getMachineStatuses, MachineStatus } from "@/services/api";
import { useEffect, useState } from "react";

export function useEquipmentData(gymId: number | null) {
  const [equipment, setEquipment] = useState<MachineStatus[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!gymId) return;

    let isActive = true;

    const fetchEquipment = async () => {
      try {
        if (!equipment) setLoading(true); // only show loading on first load
        const data = await getMachineStatuses(gymId);
        if (!isActive) return;
        setEquipment(data);
        setError(null);
      } catch (err) {
        if (!isActive) return;
        console.error("Error fetching equipment statuses", err);
        setError("Failed to load equipment");
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    // initial fetch
    fetchEquipment();

    // polling every 30s
    const intervalMs =
      Number(process.env.EXPO_PUBLIC_EQUIPMENT_INTERVAL_MS) || 30000;

    const intervalId = setInterval(fetchEquipment, intervalMs);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [gymId]);

  return { equipment, loading, error };
}
