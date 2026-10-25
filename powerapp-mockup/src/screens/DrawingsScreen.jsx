import React, { useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader.jsx';
import DataGrid from '../components/DataGrid.jsx';
import TabList from '../components/TabList.jsx';
import { FormField, FormSection } from '../components/FormView.jsx';
import { drawings, molds } from '../data.js';

const TABS = ['Browse by Drawing', 'Browse by Mold'];

/** Screen: 'Passive Drawings Master List'. */
export default function DrawingsScreen({ onHome }) {
  const [tab, setTab] = useState(TABS[0]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(drawings[0]);
  const [selectedMold, setSelectedMold] = useState(molds[0]);

  // Mirrors: SortByColumns(Filter('Drawings', StartsWith(Title, SearchInput.Text)), "Title")
  const drawingRows = useMemo(
    () =>
      drawings
        .filter((d) => d.Title.toLowerCase().startsWith(search.toLowerCase()))
        .sort((a, b) => a.Title.localeCompare(b.Title)),
    [search]
  );

  return (
    <div className="screen">
      <AppHeader title="Passive Drawings Master List" onHome={onHome} />

      <div className="card tabbar">
        <TabList tabs={TABS} active={tab} onChange={setTab} />
      </div>

      <div className="split">
        <aside className="sidebar card">
          <div className="searchbox">
            <span aria-hidden="true">🔍</span>
            <input
              placeholder="Search Drawing Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {tab === 'Browse by Drawing' ? (
            <DataGrid
              columns={[
                { field: 'Title', header: 'Drawing' },
                { field: 'Revision', header: 'Revision' },
                { field: 'Part Description', header: 'Part Description' },
              ]}
              rows={drawingRows}
              keyField="Title"
              selectedKey={selected?.Title}
              onRowSelect={setSelected}
            />
          ) : (
            <DataGrid
              columns={[
                { field: 'Mold', header: 'Mold' },
                { field: 'Drawing', header: 'Drawing' },
                { field: 'Description', header: 'Part Description' },
              ]}
              rows={molds}
              keyField="Mold"
              selectedKey={selectedMold?.Mold}
              onRowSelect={setSelectedMold}
            />
          )}
        </aside>

        <section className="detail card">
          {tab === 'Browse by Drawing' && selected && (
            <>
              <FormSection title="Drawing Details">
                <FormField label="Drawing" value={selected.Title} required />
                <FormField label="Revision" value={selected.Revision} required />
                <FormField label="Part Description" value={selected['Part Description']} required />
                <FormField
                  label="Attachments"
                  value={
                    <button className="btn btn--primary btn--sm">
                      📎 Open CAD file ↗
                    </button>
                  }
                />
              </FormSection>
              <div className="drawing-preview drawing-preview--large">
                <span>📐</span>
                <p>{selected.Title} rev {selected.Revision}</p>
                <small>Released drawing / CAD data preview</small>
              </div>
              <div className="btn-row">
                <button className="btn btn--outline">TFC Report</button>
                <button className="btn btn--outline">Principal Parts Report</button>
              </div>
            </>
          )}

          {tab === 'Browse by Mold' && selectedMold && (
            <FormSection title="Mold Details">
              <FormField label="Mold" value={selectedMold.Mold} required />
              <FormField label="Drawing" value={selectedMold.Drawing} required />
              <FormField label="Part Description" value={selectedMold['Part Description']} required />
              <FormField label="Toolmaker" value={selectedMold.Toolmaker} />
            </FormSection>
          )}
        </section>
      </div>
    </div>
  );
}
