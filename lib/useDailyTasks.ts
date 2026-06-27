"use client";

import { useLocalStorage, todayKey } from "@/lib/useLocalStorage";
import { defaultTasks, DefaultTask } from "@/data/tasks";

export type TaskState = Record<string, boolean>;

// Today's checklist completion + user-added custom tasks. Resets each day
// because the completion map is keyed by date.
export function useDailyTasks() {
  const key = `lulu:tasks:${todayKey()}`;
  const [done, setDone, ready] = useLocalStorage<TaskState>(key, {});
  const [custom, setCustom, customReady] = useLocalStorage<DefaultTask[]>(
    "lulu:customTasks",
    []
  );

  const all: DefaultTask[] = [...defaultTasks, ...custom];
  const completed = all.filter((t) => done[t.id]).length;
  const total = all.length;

  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const addTask = (label: string) => {
    const id = `c-${Date.now()}`;
    setCustom((c) => [...c, { id, label, icon: "sparkle" }]);
  };
  const removeTask = (id: string) =>
    setCustom((c) => c.filter((t) => t.id !== id));

  return {
    tasks: all,
    done,
    completed,
    total,
    toggle,
    addTask,
    removeTask,
    ready: ready && customReady,
  };
}
