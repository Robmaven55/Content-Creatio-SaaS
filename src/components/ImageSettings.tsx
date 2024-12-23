import React from 'react';

interface ImageSettingsProps {
  imagesPerSentence: number;
  onSettingsChange: (value: number) => void;
}

export function ImageSettings({ imagesPerSentence, onSettingsChange }: ImageSettingsProps) {
  return (
    <div className="w-full max-w-xs">
      <label className="block text-sm font-medium text-zinc-300 mb-2">
        Images per sentence
      </label>
      <select
        value={imagesPerSentence}
        onChange={(e) => onSettingsChange(Number(e.target.value))}
        className="input-field w-full"
      >
        <option value={1}>1 image</option>
        <option value={2}>2 images</option>
        <option value={3}>3 images</option>
      </select>
    </div>
  );
}