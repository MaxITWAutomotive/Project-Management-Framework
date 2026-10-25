import React from 'react';

/**
 * Mirrors the Power Apps Header control used on every screen:
 * ITW logo + red title + user avatar; sub-screens add a filled "Home" icon button.
 */
export default function AppHeader({ title = 'ITW', onHome }) {
  return (
    <header className="app-header">
      <div className="app-header__left">
        <div className="itw-logo" title="ITW">
          ITW
        </div>
        <span className="app-header__title">{title}</span>
      </div>
      <div className="app-header__right">
        {onHome && (
          <button className="icon-btn icon-btn--filled" title="Home" onClick={onHome}>
            ⌂
          </button>
        )}
        <div className="avatar" title="User">
          MR
        </div>
      </div>
    </header>
  );
}
