import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'trailhead_items_v1';

function getAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const localStorageAdapter = {
  list: async () => getAll(),

  get: async (id) => getAll().find((item) => item.id === id) || null,

  create: async (input) => {
    const now = new Date().toISOString();
    const item = {
      id: uuidv4(),
      name: input.name,
      type: input.type || 'module',
      url: input.url || null,
      status: input.status || 'not_started',
      // override from TRAILHEAD_TODOS.md: priority grouping fields
      priority: input.priority || null,
      priorityLabel: input.priorityLabel || null,
      points: input.points || null,
      estimatedMinutes: input.estimatedMinutes || null,
      startedAt: input.startedAt || null,
      completedAt: input.completedAt || null,
      notes: input.notes || null,
      createdAt: now,
      updatedAt: now,
    };
    const items = getAll();
    items.push(item);
    saveAll(items);
    return item;
  },

  update: async (id, patch) => {
    const items = getAll();
    const idx = items.findIndex((item) => item.id === id);
    if (idx === -1) throw new Error(`Item ${id} not found`);
    items[idx] = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
    saveAll(items);
    return items[idx];
  },

  remove: async (id) => {
    const items = getAll().filter((item) => item.id !== id);
    saveAll(items);
  },
};
