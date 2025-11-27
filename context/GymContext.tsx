import { createContext, ReactNode, useContext, useState } from "react";

type GymId = 3 | 4 | null; // 3 = Montpetit, 4 = Minto

type GymContextType = {
  selectedGymId: GymId;
  setSelectedGymId: (id: GymId) => void;
};

const GymContext = createContext<GymContextType | undefined>(undefined);

export function GymProvider({ children }: { children: ReactNode }) {
  const [selectedGymId, setSelectedGymId] = useState<GymId>(null);

  return (
    <GymContext.Provider value={{ selectedGymId, setSelectedGymId }}>
      {children}
    </GymContext.Provider>
  );
}

export function useGym() {
  const ctx = useContext(GymContext);
  if (!ctx) {
    throw new Error("useGym must be used within the GymProvider");
  }
  return ctx;
}
