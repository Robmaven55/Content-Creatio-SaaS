import React from 'react';
import { ImageIcon, TypeIcon, CameraIcon, PaintbrushIcon } from 'lucide-react';
import { StyleOption } from '../types';

const styles: StyleOption[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic rendering with natural details',
    icon: 'camera',
  },
  {
    id: 'infographic',
    name: 'Infographic',
    description: 'Clean, vector-like designs for data visualization',
    icon: 'type',
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Whimsical and colorful illustrations',
    icon: 'paintbrush',
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'High contrast, dramatic lighting effects',
    icon: 'image',
  },
];

const iconMap = {
  camera: CameraIcon,
  type: TypeIcon,
  paintbrush: PaintbrushIcon,
  image: ImageIcon,
};

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

export function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {styles.map((style) => {
        const Icon = iconMap[style.icon as keyof typeof iconMap];
        const isSelected = selectedStyle === style.id;
        
        return (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`p-6 rounded-lg border transition-all card-gradient ${
              isSelected
                ? 'border-[#FFD700] bg-[#FFD700]/5'
                : 'border-zinc-700 hover:border-[#FFD700]/50'
            }`}
          >
            <div className="flex items-center justify-center mb-3">
              <Icon className={`w-8 h-8 ${isSelected ? 'text-[#FFD700]' : 'text-zinc-400'}`} />
            </div>
            <h3 className="font-semibold text-lg mb-1 text-zinc-200">{style.name}</h3>
            <p className="text-sm text-zinc-400">{style.description}</p>
          </button>
        );
      })}
    </div>
  );
}