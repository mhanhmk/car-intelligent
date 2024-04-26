import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className=" bg-white min-h-screen h-0">
      <main className="min-h-full isolate relative">
        <img src="/bg-notfound.webp" className="inset-0 object-bottom object-cover w-full h-full -z-10 absolute"></img>
        <div className="text-center px-8 py-24 mx-auto">
          <p className="text-base leading-8 font-semibold text-white">404</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-white text-opacity-70">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/" className="text-sm font-semibold text-white">
              <span aria-hidden="true">&larr;</span> Go back home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
