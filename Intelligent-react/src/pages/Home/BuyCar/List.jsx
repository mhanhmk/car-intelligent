// eslint-disable-next-line react/prop-types
export default function List({ children }) {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {children}
        </div>
      </div>
    </div>
  )
}
