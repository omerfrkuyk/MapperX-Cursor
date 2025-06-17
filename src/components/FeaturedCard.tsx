'use client';

import { useState } from 'react';

type Props = {
  title: string;
  image: string;
  onClick: () => void;
};

const FeaturedCard = ({ title, image, onClick }: Props) => {
  return (
    <div
      className="flex-shrink-0 w-[300px] md:w-[360px] cursor-pointer rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300"
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
    </div>
  );
};

export default FeaturedCard;