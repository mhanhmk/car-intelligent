/* eslint-disable react/prop-types */
import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'

export default function Carousel({ images, className }) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  React.useEffect(() => {
    let intervalId = null

    if (!isPaused && (images?.length ?? 0) > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
      }, 3000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused])

  return (
    <div className={`relative ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          className={`absolute object-cover w-full h-full transition-opacity duration-500 rounded ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <Button
        className="absolute bg-transparent top-1/2 left-4 transform -translate-y-1/2 focus:outline-none hover:bg-opacity-40 hover:bg-gray-800"
        onClick={() => handlePrev()}
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </Button>

      <Button
        className="absolute bg-transparent top-1/2 right-4 transform -translate-y-1/2 focus:outline-none hover:bg-opacity-40
        hover:bg-gray-800"
        onClick={() => handleNext()}
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </Button>
    </div>
  )
}
