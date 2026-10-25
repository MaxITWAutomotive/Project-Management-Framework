import React, { useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader.jsx';
import DataGrid, { StatusPill } from '../components/DataGrid.jsx';
import TabList from '../components/TabList.jsx';
import { FormField, FormSection } from '../components/FormView.jsx';
import { molds, moldMakerData, assemblies, apqpPhases } from '../data.js';

const TABS = ['General Information', 'Drawings', 'Part Numbers', 'Assembly', 'Mold', 'APQP'];

/** Screen: 'Passive Mold Library'. */
export default function MoldLibraryScreen({ onHome }) {
  const [selected, setSelected] = useState(molds[0]);
  const [tab, setTab] = useState(TABS[0]);
  const [editMode, setEditMode] = useState(false);

  // "Filter by" panel: checkbox + dropdown per field (PM / Toolmaker / Status)
  const [filters, setFilters] = useState({ pm: false, tm: false, st: false });
  const [values, setValues] = useState({ pm: '', tm: '', st: '' });

  const rows = useMemo(
    () =>
      molds.filter(
        (m) =>
          (!filters.pm || !values.pm || m['Project Manager'] === values.pm) &&
          (!filters.tm || !values.tm || m.Toolmaker === values.tm) &&
          (!filters.st || !values.st || m['Project Status'] === values.st)
      ),
    [filters, values]
  );

  const maker = moldMakerData[selected?.Mold];

  const toggle = (k) => setFilters((f) => ({ ...f, [k]: !f[k] }));

  return (
    <div className="screen">
      <AppHeader title="Passive Mold Library" onHome={onHome} />
      <div className="split">
        {/* Sidebar */}
        <aside className="sidebar card">
          <div className="sidebar__top">
            <label className="switch">
              <input type="checkbox" checked={editMode} onChange={() => setEditMode(!editMode)} />
              <span>Edit Mode</span>
            </label>
            <button className="btn btn--primary btn--sm">{editMode ? 'Save' : 'Edit'}</button>
          </div>

          <div className="filter-title">
            <span aria-hidden="true">⛃</span> Filter by:
          </div>

          {[
            { k: 'pm', label: 'PM', options: [...new Set(molds.map((m) => m['Project Manager']))] },
            { k: 'tm', label: 'Toolmaker', options: [...new Set(molds.map((m) => m.Toolmaker))] },
            { k: 'st', label: 'Status', options: [...new Set(molds.map((m) => m['Project Status']))] },
          ].map((f) => (
            <div className="filter-row" key={f.k}>
              <label className="switch">
                <input type="checkbox" checked={filters[f.k]} onChange={() => toggle(f.k)} />
                <span>{f.label}</span>
              </label>
              <select
                className="select"
                disabled={!filters[f.k]}
                value={values[f.k]}
                onChange={(e) => setValues((v) => ({ ...v, [f.k]: e.target.value }))}
              >
                <option value="">All</option>
                {f.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button className="btn btn--outline" title="Open SharePoint list">
            👁 SharePoint List
          </button>

          <div className="sidebar__grid">
            <DataGrid
              columns={[
                { field: 'Drawing', header: 'Drawing' },
                { field: 'Description', header: 'Description' },
                { field: 'Mold', header: 'Mold' },
              ]}
              rows={rows}
              keyField="Mold"
              selectedKey={selected?.Mold}
              onRowSelect={setSelected}
            />
          </div>
        </aside>

        {/* Detail pane */}
        <section className="detail card">
          {!selected ? (
            <div className="welcome">
              <h2>Welcome to ITW Passive Mold Library</h2>
              <p>Select a mold from the list.</p>
            </div>
          ) : (
            <>
              <TabList tabs={TABS} active={tab} onChange={setTab} />
              <div className="detail__body">
                {tab === 'General Information' && (
                  <>
                    <FormSection title="General Information">
                      <FormField label="Part Description" value={selected['Part Description']} required />
                      <FormField label="Customer" value={selected.Customer} required />
                      <FormField label="Customer Part Number" value={selected['Customer Part Number']} required />
                      <FormField label="ITW Part Number" value={selected['ITW Part Number']} required />
                      <FormField label="Project Manager" value={selected['Project Manager']} />
                      <FormField label="Toolmaker" value={selected.Toolmaker} />
                      <FormField label="Project Status" value={<StatusPill value={selected['Project Status']} />} />
                      <FormField label="Timing Status" value={<StatusPill value={selected['Timing Status']} />} />
                    </FormSection>
                    <FormSection title="Mold Characteristics">
                      <FormField label="Mold" value={selected.Mold} required />
                      <FormField label="Cavities" value={selected.Cavities} required />
                      <FormField label="Tool Type" value={selected['Tool Type']} required />
                      <FormField label="Mold Status" value={<StatusPill value={selected['Mold Status']} />} required />
                      <FormField label="LDR" value={selected.LDR} />
                      <FormField label="OEM" value={selected.OEM} />
                    </FormSection>
                  </>
                )}

                {tab === 'Drawings' && (
                  <FormSection title="Drawing">
                    <FormField label="Drawing Number" value={selected.Drawing} />
                    <div className="drawing-preview" aria-label="Drawing preview placeholder">
                      <span>📄</span>
                      <p>{selected.Drawing}.pdf</p>
                    </div>
                    <button className="btn btn--primary">Open Drawing ↗</button>
                  </FormSection>
                )}

                {tab === 'Part Numbers' && (
                  <>
                    <FormSection title="Part Numbers" columns={3}>
                      <FormField label="OEM" value={selected.OEM} />
                      <FormField label="LDR" value={selected.LDR} />
                      <FormField label="Color Description" value={selected['Color Description']} />
                      <FormField
                        label="Color"
                        value={
                          <span className="color-chip" style={{ background: selected.Color }}>
                            &nbsp;
                          </span>
                        }
                      />
                      <FormField label="Part Number" value={selected['Part Number']} />
                      <FormField label="ITW Part Number" value={selected['ITW Part Number']} />
                    </FormSection>
                    <FormSection title="Raw Material" columns={3}>
                      <FormField label="Supplier" value={selected.Supplier} />
                      <FormField label="Description" value={selected['Part Description']} />
                      <FormField label="Material Code" value={selected['Material Code']} />
                    </FormSection>
                    <div className="btn-row">
                      <button className="btn btn--outline">View Selected Part Number</button>
                      <button className="btn btn--outline">View Selected Material</button>
                    </div>
                  </>
                )}

                {tab === 'Assembly' && (
                  <>
                    <h4 className="subheading">Assembly</h4>
                    <DataGrid
                      columns={[
                        { field: 'Part Description', header: 'Part Description' },
                        { field: 'Customer', header: 'Customer' },
                        { field: 'Customer Part Number', header: 'Customer Part Number' },
                        { field: 'ITW Part Number', header: 'ITW Part Number' },
                      ]}
                      rows={assemblies}
                      keyField="ITW Part Number"
                    />
                    <h4 className="subheading">
                      Molds in this assembly (Select an assembly from table above)
                    </h4>
                    <DataGrid
                      columns={[
                        { field: 'Project Status', header: 'Project Status', render: (v) => <StatusPill value={v} /> },
                        { field: 'Description (APP ONLY)', header: 'Description' },
                        { field: 'Mold', header: 'Mold' },
                      ]}
                      rows={assemblies}
                      keyField="Mold"
                    />
                  </>
                )}

                {tab === 'Mold' && (
                  <>
                    <FormSection title="Mold Maker Data">
                      <FormField label="Tool Name" value={maker?.ToolName} />
                      <FormField
                        label="Running Status"
                        value={<StatusPill value={maker?.RunningStatus ?? 'Offline'} />}
                      />
                      <FormField label="Cycle Counter" value={maker?.Counter?.toLocaleString()} />
                      <FormField label="Temperature (°C)" value={maker?.Temperature} />
                      <FormField label="Last Sensor Reading" value={maker?.LastReading} />
                      <FormField label="Location" value={maker?.Location} />
                    </FormSection>
                    <p className="hint">Last Refresh — Refreshes every 15 min</p>
                  </>
                )}

                {tab === 'APQP' && (
                  <>
                    <h4 className="subheading">Mold APQP Phase Status</h4>
                    <DataGrid
                      columns={[
                        { field: 'Phase', header: 'Phase' },
                        { field: 'Start', header: 'Phase Start Real' },
                        { field: 'End', header: 'Phase End' },
                        { field: 'Status', header: 'Status', render: (v) => <StatusPill value={v} /> },
                      ]}
                      rows={apqpPhases}
                      keyField="Phase"
                    />
                    <div className="btn-row action-bar">
                      <button className="btn btn--primary">📂 APQP Folder</button>
                      <button className="btn btn--primary">🗓 Timeline</button>
                      <button className="btn btn--primary">🗄 Item Record</button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
