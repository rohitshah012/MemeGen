import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="mx-auto grid min-h-[55vh] max-w-3xl place-items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-black uppercase text-pink-600">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600">
          That route does not exist. Head back to the template gallery and keep creating.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
