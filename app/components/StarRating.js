import { StarIcon } from 'lucide-react';
import React from 'react';
const StarRating = ({ rating }) => {
  const filledStars = Math.round(rating * 2) / 2; // Round to the nearest half
  const maxStars = 5;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= filledStars;
      const starClass = isFilled ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300';

      stars.push(
        <StarIcon key={i} className={`w-4 h-4 ${starClass}`} />
      );
    }

    return stars;
  };

  return (
    <div className="flex items-center space-x-1">
      {renderStars()}
      {/* <span className="text-gray-500 text-sm">{rating}</span> */}
    </div>
  );
};
export default StarRating;