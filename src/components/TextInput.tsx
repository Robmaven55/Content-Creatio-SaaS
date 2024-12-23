import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (text: string) => void;
}

export function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="w-full">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter your script here (20-60 seconds)"
        className="input-field w-full h-48 resize-none"
      />
      <div className="mt-2 text-sm text-zinc-400">
        {value.length > 0 && (
          <span>
            Approximate duration: {Math.ceil(value.split(' ').length / 2.5)} seconds
          </span>
        )}
      </div>
    </div>
  );
}