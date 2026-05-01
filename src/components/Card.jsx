import { Link } from "react-router-dom";

function Card({ image, title, boxCount }) {
  const editPath = `/edit?url=${encodeURIComponent(image)}&name=${encodeURIComponent(
    title,
  )}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <Link to={editPath} className="block bg-slate-100" aria-label={`Edit ${title}`}>
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-1 items-start justify-between gap-3">
          <h2 className="line-clamp-2 text-base font-bold leading-snug text-slate-950">
            {title}
          </h2>
          {boxCount ? (
            <span className="shrink-0 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700">
              {boxCount} boxes
            </span>
          ) : null}
        </div>

        <Link
          to={editPath}
          className="mt-5 inline-flex items-center justify-center rounded-md bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
        >
          Edit template
        </Link>
      </div>
    </article>
  );
}

export default Card;
