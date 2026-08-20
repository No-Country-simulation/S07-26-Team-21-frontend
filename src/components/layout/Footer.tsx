import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <span>DIAGNÓSTICO ANÓNIMO</span> • <span>~8 MIN</span> • <span>BENCHMARK·DC © {new Date().getFullYear()}</span>
    </footer>
  );
};
