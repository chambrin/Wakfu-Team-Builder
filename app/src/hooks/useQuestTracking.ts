import { useState, useCallback } from 'react';
import type { QuestStatus } from '../types';

const STORAGE_KEY = 'wakfu-quest-progress';

const STATUS_CYCLE: QuestStatus[] = ['todo', 'in-progress', 'done'];

function loadProgress(): Record<string, QuestStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Record<string, QuestStatus>;
  } catch {
    // ignore
  }
  return {};
}

function saveProgress(data: Record<string, QuestStatus>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors
  }
}

export function useQuestTracking() {
  const [progress, setProgress] = useState<Record<string, QuestStatus>>(loadProgress);

  const getStatus = useCallback(
    (questId: string): QuestStatus => progress[questId] ?? 'todo',
    [progress]
  );

  const setStatus = useCallback((questId: string, status: QuestStatus) => {
    setProgress((prev) => {
      const updated = { ...prev, [questId]: status };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const cycleStatus = useCallback((questId: string) => {
    setProgress((prev) => {
      const current = prev[questId] ?? 'todo';
      const idx = STATUS_CYCLE.indexOf(current);
      const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
      const updated = { ...prev, [questId]: next };
      saveProgress(updated);
      return updated;
    });
  }, []);

  const resetAll = useCallback(() => {
    saveProgress({});
    setProgress({});
  }, []);

  return { progress, getStatus, setStatus, cycleStatus, resetAll };
}
