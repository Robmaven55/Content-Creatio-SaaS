import React from 'react';
import { RefreshCw } from 'lucide-react';

interface GeneratedImage {
  id: number;
  imageUrl: string;
  prompt: string;
  sentence: string;
}

interface GeneratedImagesProps {
  images: GeneratedImage[];
  onRegenerate?: (imageId: number) => void;
}

export function GeneratedImages({ images, onRegenerate }: GeneratedImagesProps) {
  if (!images.length) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6 gradient-text">Generated Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div key={image.id} className="card-gradient rounded-lg overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={image.imageUrl}
                alt={image.prompt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {onRegenerate && (
                <button
                  onClick={() => onRegenerate(image.id)}
                  className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                  title="Regenerate image"
                >
                  <RefreshCw className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm text-zinc-400">{image.sentence}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}