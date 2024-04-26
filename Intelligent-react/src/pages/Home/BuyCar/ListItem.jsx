import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

ListItem.propTypes = {
  carInfo: PropTypes.shape({
    modelId: PropTypes.number,
    brandName: PropTypes.string,
    subBrandName: PropTypes.string,
    modelName: PropTypes.string,
    name: PropTypes.string,
    maxPrice: PropTypes.number,
    minPrice: PropTypes.number,
    imgPath: PropTypes.string,
  }),
  hasShadow: PropTypes.bool,
}

export default function ListItem({ carInfo, hasShadow = true }) {
  return (
    <div
      className={`font-sans w-72 ${
        hasShadow ? 'shadow-xl' : ''
      } overflow-hidden transition ease-in-out bg-white hover:shadow-xl hover:-translate-y-2`}
      style={{ transformOrigin: '50% 50% 0px', borderRadius: '3.19149% / 2.43902%' }}
    >
      <Link to={`/cardetail/${carInfo.modelId}`} className="w-full h-full">
        <div className="flex justify-center w-72 h-48">
          <img src={carInfo.imgPath} alt="" className="object-cover" loading="lazy" />
        </div>
        <div className="flex-auto px-6 pb-1">
          <div className="flex flex-col">
            <h1 className="flex-auto h-14 text-lg font-semibold text-slate-900">
              {carInfo.subBrandName + ' ' + carInfo.modelName}
            </h1>
            <div className="text-base font-semibold text-slate-500">￥{carInfo.minPrice + ' - ' + carInfo.maxPrice + 'w'}</div>
            <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">{carInfo.brandName}</div>
          </div>
          <div className="mt-3 flex space-x-4 mb-6 text-sm font-medium">
            <div className="flex-auto flex space-x-4">
              <button className="h-10 px-6 font-semibold rounded-md bg-black text-white">购买</button>
            </div>
            <button
              className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
              type="button"
              aria-label="Like"
            >
              <svg width="20" height="20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}
