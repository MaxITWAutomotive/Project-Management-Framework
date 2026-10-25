import React from 'react';

/** Mirrors ModernTabList (Subtle appearance, red palette). */
export default function TabList({ tabs, active, onChange }) {
  return (
    <div className="tablist" role="tablist">
      {tabs.map((t) => (
        <button
          key={t}
          role="tab"
          aria-selected={active === t}
          className={`tablist__tab${active === t ? ' tablist__tab--active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
