import React, { useState } from 'react';
import AppHeader from '../components/AppHeader.jsx';
import DataGrid, { StatusPill } from '../components/DataGrid.jsx';
import { FormField, FormSection } from '../components/FormView.jsx';
import { assemblies } from '../data.js';

/** Screen: 'Passive Assembly Master List'. */
export default function AssembliesScreen({ onHome }) {
  const [selected, setSelected] = useState(assemblies[0]);

  return (
    <div className="screen">
      <AppHeader title="Passive Assembly Master List" onHome={onHome} />

      <div className="split">
        <aside className="sidebar card">
          {/* ModernDataGrid with Searchable + ShowAIRowSummary */}
          <DataGrid
            searchable
            columns={[
              { field: 'ITW Part Number', header: 'ITW Part Number' },
              { field: 'Part Description', header: 'Part Description' },
              { field: 'Customer Part Number', header: 'Customer Part Number' },
            ]}
            rows={assemblies}
            keyField="ITW Part Number"
            selectedKey={selected?.['ITW Part Number']}
            onRowSelect={setSelected}
          />
        </aside>

        <section className="detail card">
          {selected && (
            <>
              <FormSection title="Assembly Information">
                <FormField label="ITW Part Number" value={selected['ITW Part Number']} required />
                <FormField label="Part Description" value={selected['Part Description']} required />
                <FormField label="Customer Part Number" value={selected['Customer Part Number']} required />
                <FormField label="Customer" value={selected.Customer} required />
                <FormField label="Project Status" value={<StatusPill value={selected['Project Status']} />} />
                <FormField label="Description" value={selected.Description} />
              </FormSection>

              <h4 className="subheading">Components</h4>
              <DataGrid
                columns={[
                  { field: 'Mold', header: 'Mold' },
                  { field: 'Mold Status', header: 'Mold Status', render: (v) => <StatusPill value={v} /> },
                  { field: 'Description (APP ONLY)', header: 'Description' },
                ]}
                rows={[selected]}
                keyField="Mold"
              />

              <div className="btn-row action-bar">
                <button className="btn btn--primary">📐 View Drawings</button>
                <button className="btn btn--primary">🗄 Component Records</button>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
