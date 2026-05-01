import { Link } from "react-router-dom";

function About() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-8">
        <div>
          <p className="text-sm font-black uppercase text-pink-600">About MemeGen</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            A focused meme editor built for quick creation.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            MemeGen uses public meme templates, draggable text layers, and browser-side image
            export so you can create a finished meme without signing in or uploading anything to a
            server.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
          >
            Browse templates
          </Link>
        </div>

        <div className="rounded-lg bg-slate-950 p-6 text-white">
          <h2 className="text-xl font-black">What works</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
            <li>Responsive template grid with search and random selection.</li>
            <li>Mobile-friendly editor with movable, editable text layers.</li>
            <li>High-resolution JPEG export directly from the browser.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
