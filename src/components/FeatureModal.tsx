'use client';

type Feature = {
  title: string;
  description: string;
  image: string;
};

const FeatureModal = ({
  feature,
  onClose,
}: {
  feature: Feature;
  onClose: () => void;
}) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === 'modal-background') {
      onClose();
    }
  };

  return (
    <div
      id="modal-background"
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
      onClick={handleBackgroundClick}
    >
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl">
        {/* Sol taraf: içerik */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-evenly">
          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
            {feature.title}
          </h3>
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line">
            {feature.description}
          </p>
        </div>

        {/* Sağ taraf: görsel */}
        <div className="w-full md:w-1/2">
          <img
            src={feature.image}
            alt={feature.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;