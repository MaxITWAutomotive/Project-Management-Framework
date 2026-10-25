import React from 'react';

/** Read-only field card mirroring TypedDataCard (ModernTextualEdit) in view mode. */
export function FormField({ label, value, required = false }) {
  return (
    <div className="form-field">
      <label className="form-field__label">
        {label}
        {required && <span className="form-field__star">*</span>}
      </label>
      <div className="form-field__value">{value == null || value === '' ? '—' : value}</div>
    </div>
  );
}

export function FormSection({ title, children, columns = 2 }) {
  return (
    <section className="form-section">
      <h3 className="form-section__title">{title}</h3>
      <div className="form-section__grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {children}
      </div>
    </section>
  );
}
