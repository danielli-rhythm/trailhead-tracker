import { useState } from 'react';

const TYPES = ['module', 'trail', 'project', 'superbadge'];
const STATUSES = ['not_started', 'in_progress', 'completed'];
const PRIORITIES = [
  { value: '', label: 'None' },
  { value: '1', label: '1 — Core Skills (Sprint 0)' },
  { value: '2', label: '2 — Integration Layer (Before Sprint 1)' },
  { value: '3', label: '3 — Data Model & Security (Sprint 1)' },
  { value: '4', label: '4 — UI Patterns (Sprint 1–2)' },
  { value: '5', label: '5 — Advanced (Sprint 2+)' },
];
const PRIORITY_LABELS = {
  1: 'Core Skills (Sprint 0)',
  2: 'Integration Layer (Before Sprint 1)',
  3: 'Data Model & Security (Sprint 1)',
  4: 'UI Patterns (Sprint 1–2)',
  5: 'Advanced (Sprint 2+)',
};

const DEFAULTS = {
  name: '',
  type: 'module',
  url: '',
  status: 'not_started',
  priority: '',
  points: '',
  estimatedMinutes: '',
  startedAt: '',
  completedAt: '',
  notes: '',
};

export default function ItemForm({ initialValues, onSubmit, submitLabel = 'Save' }) {
  const [values, setValues] = useState({ ...DEFAULTS, ...initialValues });

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const priority = values.priority ? Number(values.priority) : null;
    onSubmit({
      name: values.name,
      type: values.type,
      url: values.url || null,
      status: values.status,
      priority,
      priorityLabel: priority ? PRIORITY_LABELS[priority] : null,
      points: values.points ? Number(values.points) : null,
      estimatedMinutes: values.estimatedMinutes ? Number(values.estimatedMinutes) : null,
      startedAt: values.startedAt || null,
      completedAt: values.completedAt || null,
      notes: values.notes || null,
    });
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <label>
        Name *
        <input name="name" value={values.name} onChange={handleChange} required />
      </label>

      <label>
        Type
        <select name="type" value={values.type} onChange={handleChange}>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <label>
        URL
        <input name="url" type="url" value={values.url} onChange={handleChange} placeholder="https://trailhead.salesforce.com/..." />
      </label>

      <label>
        Status
        <select name="status" value={values.status} onChange={handleChange}>
          {STATUSES.map((s) => <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>)}
        </select>
      </label>

      <label>
        Priority
        <select name="priority" value={values.priority} onChange={handleChange}>
          {PRIORITIES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>
      </label>

      <label>
        Points
        <input name="points" type="number" min="0" value={values.points} onChange={handleChange} />
      </label>

      <label>
        Estimated Minutes
        <input name="estimatedMinutes" type="number" min="0" value={values.estimatedMinutes} onChange={handleChange} />
      </label>

      <label>
        Started At
        <input name="startedAt" type="date" value={values.startedAt} onChange={handleChange} />
      </label>

      <label>
        Completed At
        <input name="completedAt" type="date" value={values.completedAt} onChange={handleChange} />
      </label>

      <label>
        Notes
        <textarea name="notes" value={values.notes} onChange={handleChange} rows={3} />
      </label>

      <button type="submit" className="btn-primary">{submitLabel}</button>
    </form>
  );
}
