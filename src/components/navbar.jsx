import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Templates", to: "/" },
  { label: "Create", to: "/edit" },
  { label: "About", to: "/about" },
];

const getLinkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-bold transition ${
    isActive
      ? "bg-white text-slate-950"
      : "text-slate-200 hover:bg-white/10 hover:text-white"
  }`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-pink-500 text-lg font-black text-white">
            M
          </span>
          <span className="text-lg font-black tracking-tight">MemeGen</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          className="inline-flex rounded-md border border-white/20 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 px-4 pb-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={getLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
