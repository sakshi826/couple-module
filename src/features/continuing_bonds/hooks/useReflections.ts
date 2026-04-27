import { useState, useCallback } from "react";

export interface Reflection {
  id: string;
  connectionType: string;
  primaryResponse: string;
  deeperResponse?: string;
  bondAction?: string;
  createdAt: Date;
}

const STORAGE_KEY = "continuing-bonds-reflections";

export function useReflections() {
  const [reflections, setReflections] = useState<Reflection[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored).map((r: any) => ({ ...r, createdAt: new Date(r.createdAt) })) : [];
    } catch {
      return [];
    }
  });

  const save = useCallback((reflection: Omit<Reflection, "id" | "createdAt">) => {
    const entry: Reflection = {
      ...reflection,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setReflections((prev) => {
      const next = [entry, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    return entry;
  }, []);

  return { reflections, save };
}
