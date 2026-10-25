import React, { useState } from 'react';

/**
 * Simplified stand-in for ModernDataGrid / Table controls:
 * sortable headers, row selection, optional search box (Searchable: true).
 */
export default function DataGrid({ columns, rows, keyField, onRowSelect, selectedKey, searchable = false }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);

  const sorted = React.useMemo(() => {
    if (!sortCol) return rows;
    return [...rows].sort((a, b) => {
      const av = String(a[sortCol] ?? '');
      const bv = String(b[sortCol] ?? '');
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [rows, sortCol, sortAsc]);

  const handleSort = (col) => {
    if (sortCol === col) setSortAsc(!sortAsc);
    else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  return (
    <div className="datagrid">
      {searchable && (
        <input className="datagrid__search" placeholder="Search…" readOnly />
      )}
      <div className="datagrid__scroll">
        <table>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.field} onClick={() => handleSort(c.field)} style={{ width: c.width }}>
                  {c.header}
                  {sortCol === c.field ? (sortAsc ? ' ▲' : ' ▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => {
              const key = r[keyField] ?? i;
              const isSelected = selectedKey != null && selectedKey === key;
              return (
                <tr
                  key={key}
                  className={isSelected ? 'selected' : ''}
                  onClick={() => onRowSelect && onRowSelect(r)}
                >
                  {columns.map((c) => (
                    <td key={c.field}>{c.render ? c.render(r[c.field], r) : r[c.field]}</td>
                  ))}
                </tr>
              );
            })}
            {sorted.length === 0 && (
              <tr>
                <td className="datagrid__empty" colSpan={columns.length}>
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusPill({ value }) {
  const v = String(value || '').toLowerCase();
  let cls = 'pill--neutral';
  if (['active', 'running', 'complete', 'approved', 'production', 'on track'].includes(v)) cls = 'pill--green';
  if (['delayed', 'risk', 'not started'].includes(v)) cls = 'pill--red';
  if (['trial', 'in progress', 'submitted', 'planned', 'manufacturing'].includes(v)) cls = 'pill--yellow';
  return <span className={`pill ${cls}`}>{value}</span>;
}
