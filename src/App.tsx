import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30 flex items-center justify-center text-2xl font-bold mx-auto">
          KH
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">KeralaHub.online</h1>
        <p className="text-slate-400 text-sm">
          Project Wiped & Reset — Ready to Build From Scratch.
        </p>
      </div>
    </div>
  );
};

export default App;
