import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black text-slate-950">MemeGen</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
            Pick a popular template, add movable text, and export a clean image in seconds.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase text-slate-950">Product</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <Link className="hover:text-pink-600" to="/">
                Templates
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-600" to="/edit">
                Create
              </Link>
            </li>
            <li>
              <Link className="hover:text-pink-600" to="/about">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-black uppercase text-slate-950">Stack</h3>
          <p className="text-sm leading-6 text-slate-600">
            React, Vite, Tailwind CSS, Imgflip templates, and html-to-image.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-200 px-4 py-4 text-center text-sm text-slate-500">
        Copyright 2026 MemeGen. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
