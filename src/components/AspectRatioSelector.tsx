import React from 'react';
import { AspectRatio } from '../types';

interface AspectRatioSelectorProps {
  value: AspectRatio;
  onChange: (ratio: AspectRatio) => void;
}

const ratios: { value: AspectRatio; label: string }[] = [
  { value: '1:1', label: 'Square' },
  { value: '16:9', label: 'Landscape' },
  { value: '4:3', label: 'Classic' },
  { value: '3:2', label: 'Photo' },
  { value: '2:3', label: 'Portrait' },
  { value: '3:4', label: 'Vertical' },
  { value: '9:16', label: 'Story' },
];

export function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {ratios.map((ratio) => (
        <button
          key={ratio.value}
          onClick={() => onChange(ratio.value)}
          className={`px-4 py-2 rounded-lg transition-all ${
            value === ratio.value
              ? 'bg-[#FFD700] text-black'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {ratio.label} ({ratio.value})
        </button>
      ))}
    </div>
  );
}