import { localStorageAdapter } from './localStorageAdapter';

beforeEach(() => {
  localStorage.clear();
});

describe('localStorageAdapter', () => {
  it('create → list → update → remove', async () => {
    // Create
    const item = await localStorageAdapter.create({
      name: 'Apex Basics',
      type: 'module',
      priority: 1,
      priorityLabel: 'Core Skills (Sprint 0)',
    });
    expect(item.id).toBeDefined();
    expect(item.name).toBe('Apex Basics');
    expect(item.priority).toBe(1);
    expect(item.createdAt).toBeDefined();

    // List
    const items = await localStorageAdapter.list();
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(item.id);

    // Get
    const fetched = await localStorageAdapter.get(item.id);
    expect(fetched.name).toBe('Apex Basics');

    // Update
    const updated = await localStorageAdapter.update(item.id, {
      status: 'in_progress',
    });
    expect(updated.status).toBe('in_progress');
    expect(updated.updatedAt).not.toBe(item.updatedAt);

    // Remove
    await localStorageAdapter.remove(item.id);
    const remaining = await localStorageAdapter.list();
    expect(remaining).toHaveLength(0);
  });

  it('get returns null for missing id', async () => {
    const result = await localStorageAdapter.get('nonexistent');
    expect(result).toBeNull();
  });

  it('update throws for missing id', async () => {
    await expect(
      localStorageAdapter.update('nonexistent', { name: 'x' })
    ).rejects.toThrow('Item nonexistent not found');
  });
});
