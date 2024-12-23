import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface AudioUploadProps {
  onFileSelect: (file: File) => void;
}

export function AudioUpload({ onFileSelect }: AudioUploadProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all
        ${isDragActive ? 'border-[#FFD700] bg-[#FFD700]/5' : 'border-zinc-700 hover:border-[#FFD700]/50'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-[#FFD700]" />
      <p className="text-lg font-medium text-zinc-200">
        {isDragActive ? 'Drop the audio file here' : 'Drag & drop an audio file, or click to select'}
      </p>
      <p className="mt-2 text-sm text-zinc-400">Supported formats: MP3, WAV, M4A</p>
    </div>
  );
}