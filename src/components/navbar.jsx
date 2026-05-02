import { useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../assets/image.png";

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
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setIsOpen(false)}
          aria-label="MemeGen home"
        >
          {logoFailed ? (
            <>
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-pink-500 text-lg font-black text-white">
                M
              </span>
              <span className="text-lg font-black tracking-tight">MemeGen</span>
            </>
          ) : (
            <>
              <img
                src={logo}
                alt="MemeGen logo"
                onError={() => setLogoFailed(true)}
                className="h-12 w-auto max-w-[120px] rounded-md bg-white object-contain px-2 py-1 shadow-sm sm:h-14 sm:max-w-[150px]"
              />
              <span className="hidden text-lg font-black tracking-tight text-white sm:inline">
                MemeGen
              </span>
            </>
          )}
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
