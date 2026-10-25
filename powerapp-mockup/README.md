# Passive Project Management Framework — React Mockup

A plain **React + CSS** mockup of the Power Apps canvas app found in `../PassiveFrameworkApp`
(YAML source under `Src/*.pa.yaml`). No external UI libraries are used — styling is hand-written CSS
that mirrors the app's ITW red theme and auto-layout containers.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

## What was inspected in the Power App

| Power App artifact | Mockup equivalent |
|---|---|
| `App.pa.yaml` — OnStart footer text, StartScreen, ITW theme (accent `RGBA(249,83,109)`, header text `RGBA(184,0,0)`) | CSS variables in `src/styles.css`, footer string in `src/data.js` |
| Screen **“Passive Project Management Framework”** (home): Header control + 3 navigation cards (Mold Library / Drawings / Assemblies) with images, bold buttons and descriptions; footer label | `src/screens/HomeScreen.jsx` |
| Screen **“Passive Mold Library”**: sidebar with *Edit Mode* toggle, “Filter by:” panel (PM / Toolmaker / Status = checkbox + dropdown), “SharePoint List” button, DataGrid (Drawing / Description / Mold); detail pane with `ModernTabList` tabs **General Information · Drawings · Part Numbers · Assembly · Mold · APQP**, view forms (`Form` + `TypedDataCard`), nested grids, status-color fills (green/yellow/red), action buttons **APQP Folder / Timeline / Item Record** | `src/screens/MoldLibraryScreen.jsx` |
| Screen **“Passive Drawings Master List”**: tabs *Browse by Drawing / Browse by Mold*, search box (`Search Drawing Number`, mirrors `StartsWith(Title, …)` filter), Table columns Drawing/Revision/Part Description, detail Form incl. Attachments, second grid grouped by Mold | `src/screens/DrawingsScreen.jsx` |
| Screen **“Passive Assembly Master List”**: searchable DataGrid (ITW Part Number / Part Description / Customer Part Number from `CS System-Masterlist.`), detail form + components grid (`DataGrid6`) | `src/screens/AssembliesScreen.jsx` |
| Home icon button on sub-screens (`Navigate('Passive Project Management Framework')`) | `onHome` prop wired through `App.jsx` |
| Data sources: `ITW Masterlist`, `Mold Maker Data` (ToolName, RunningStatus, Counter, Temperature, LastReading, Location — “refreshes every 15 min”), `Drawings`, `CS System-Masterlist.` | Mock records in `src/data.js` |

## Structure

```
src/
  App.jsx                     # screen switching (mirrors Navigate())
  styles.css                  # ITW theme, container/card/grid/tab/form styles
  data.js                     # mock data shaped like the Dataverse/SP lists
  components/
    AppHeader.jsx             # logo + title + avatar (+ Home button)
    TabList.jsx               # ModernTabList (Subtle appearance)
    DataGrid.jsx              # ModernDataGrid/Table w/ sorting & selection + StatusPill
    FormView.jsx              # read-only Form / TypedDataCard equivalents
  screens/
    HomeScreen.jsx
    MoldLibraryScreen.jsx
    DrawingsScreen.jsx
    AssembliesScreen.jsx
```

Notes: this is a UI mockup only — filters, tabs, row selection and search work against local mock
data; there is no Dataverse/SharePoint connectivity.
