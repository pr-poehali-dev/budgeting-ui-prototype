export default function GlobalStyles() {
  return (
    <style>{`
      :root {
        --bg-page: #EFEFEC;
        --bg-modal: #FFFFFF;
        --ink: #0D0D0D;
        --ink-mid: #5A5A5A;
        --ink-light: #9A9A9A;
        --line: #E2E0DB;
        --field-bg: #F7F6F3;
      }
      .f-input {
        background: var(--field-bg);
        border: 1.5px solid var(--line);
        border-radius: 3px;
        color: var(--ink);
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 14px;
        padding: 10px 14px;
        width: 100%;
        outline: none;
        transition: border-color 0.15s;
        display: block;
      }
      .f-input:focus { border-color: var(--ink); }
      .f-input::placeholder { color: var(--ink-light); }
      select.f-input { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239A9A9A' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
      .step-trans { transition: opacity 0.2s ease, transform 0.2s ease; }
      .btn-primary { background: var(--ink); color: #fff; font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border: none; border-radius: 3px; padding: 11px 22px; cursor: pointer; transition: opacity 0.15s; }
      .btn-primary:hover { opacity: 0.8; }
      .btn-ghost { background: transparent; color: var(--ink-mid); font-family: 'IBM Plex Sans', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; border: 1.5px solid var(--line); border-radius: 3px; padding: 10px 20px; cursor: pointer; transition: border-color 0.15s, color 0.15s; }
      .btn-ghost:hover { border-color: var(--ink); color: var(--ink); }
      .preview-row { display: flex; justify-content: space-between; align-items: baseline; padding: 9px 0; border-bottom: 1px solid var(--line); gap: 16px; }
      .preview-row:last-child { border-bottom: none; }
      .radio-opt { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 3px 0; }
      .radio-opt input[type="radio"] { accent-color: var(--ink); width: 14px; height: 14px; cursor: pointer; flex-shrink: 0; }
      .toggle-track { width: 38px; height: 20px; border-radius: 10px; background: var(--line); position: relative; transition: background 0.2s; flex-shrink: 0; }
      .toggle-track.on { background: var(--ink); }
      .toggle-thumb { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: #fff; border-radius: 50%; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
      .toggle-track.on .toggle-thumb { left: 20px; }
      @keyframes checkPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
      .check-pop { animation: checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
      .prio-btn { border: 1.5px solid var(--line); border-radius: 3px; background: transparent; color: var(--ink-mid); font-family: 'IBM Plex Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.07em; text-transform: uppercase; padding: 7px 14px; cursor: pointer; transition: all 0.15s; }
      .prio-btn.active { border-color: var(--ink); background: var(--ink); color: #fff; }
    `}</style>
  );
}
