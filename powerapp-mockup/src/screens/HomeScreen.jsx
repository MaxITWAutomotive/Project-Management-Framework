import React from 'react';
import AppHeader from '../components/AppHeader.jsx';
import { footerText } from '../data.js';

const cards = [
  {
    key: 'mold',
    icon: '🏭',
    title: 'Mold Library',
    desc: 'See detailed Mold Information, Part Numbers, Colors, Raw Material, APQP Process and more.',
  },
  {
    key: 'drawings',
    icon: '📐',
    title: 'Drawings',
    desc: 'See latest released drawings, CAD data, TFC and Principal Parts Report.',
  },
  {
    key: 'assemblies',
    icon: '🧩',
    title: 'Assemblies',
    desc: 'See Assembly Information, components, drawings etc...',
  },
];

/** Screen: 'Passive Project Management Framework' — landing page with three navigation cards. */
export default function HomeScreen({ onNavigate }) {
  return (
    <div className="screen screen--home">
      <AppHeader />
      <main className="home-main">
        {cards.map((c) => (
          <button key={c.key} className="nav-card" onClick={() => onNavigate(c.key)}>
            <span className="nav-card__icon" aria-hidden="true">
              {c.icon}
            </span>
            <span className="nav-card__title">{c.title}</span>
            <span className="nav-card__desc">{c.desc}</span>
          </button>
        ))}
      </main>
      <footer className="app-footer">{footerText}</footer>
    </div>
  );
}
