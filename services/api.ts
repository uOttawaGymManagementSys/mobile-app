// services/api.ts
import { API_BASE_URL } from "@env";

const BASE_URL = API_BASE_URL ?? "http://localhost:3000/api";

export type TrafficRecord = {
  id: number;
  recorded_at: string; // ISO timestamp from backend
  traffic_count: number;
  gym_id: number;
};

export async function getLatestTraffic(gymId: number): Promise<TrafficRecord> {
  const res = await fetch(`${BASE_URL}/traffic/latest/gym/${gymId}`);

  if (!res.ok) {
    console.error(
      "Failed to fetch latest traffic:",
      res.status,
      res.statusText
    );
    throw new Error("Failed to fetch latest traffic");
  }
  console.log(res.json());
  return res.json();
}

export type MachineStatus = {
  id: number;
  name: string;
  number: number;
  status: boolean;
  status_changed_at: string; // ISO timestamp
  gym_id: number;
};

export async function getMachineStatuses(
  gymId: number
): Promise<MachineStatus[]> {
  const res = await fetch(`${BASE_URL}/machinestatus/gym/${gymId}`);

  if (!res.ok) {
    console.error(
      "Failed to fetch machine statuses:",
      res.status,
      res.statusText
    );
    throw new Error("Failed to fetch machine statuses");
  }
  console.log(res.json());
  return res.json();
}
