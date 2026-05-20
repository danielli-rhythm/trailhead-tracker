const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const httpAdapter = {
  list: async () => {
    const res = await fetch(`${BASE_URL}/items`);
    if (!res.ok) throw new Error(`List failed: ${res.status}`);
    return res.json();
  },

  get: async (id) => {
    const res = await fetch(`${BASE_URL}/items/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Get failed: ${res.status}`);
    return res.json();
  },

  create: async (input) => {
    const res = await fetch(`${BASE_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error(`Create failed: ${res.status}`);
    return res.json();
  },

  update: async (id, patch) => {
    const res = await fetch(`${BASE_URL}/items/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status}`);
    return res.json();
  },

  remove: async (id) => {
    const res = await fetch(`${BASE_URL}/items/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  },
};
