import React, { useState } from 'react';
import { StyleSelector } from './components/StyleSelector';
import { TextInput } from './components/TextInput';
import { AudioUpload } from './components/AudioUpload';
import { ImageSettings } from './components/ImageSettings';
import { GeneratedImages } from './components/GeneratedImages';
import { AspectRatioSelector } from './components/AspectRatioSelector';
import { FileText, Mic, Loader2 } from 'lucide-react';
import { Header } from './components/Header';
import { generateImages } from './services/imageGeneration';
import type { UploadType, ImageGenerationSettings, AspectRatio } from './types';

function App() {
  const [uploadType, setUploadType] = useState<UploadType>('text');
  const [script, setScript] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<ImageGenerationSettings>({
    style: 'realistic',
    imagesPerSentence: 1,
    aspectRatio: '1:1',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      if (uploadType === 'text' && script) {
        const images = await generateImages(script, settings);
        setGeneratedImages(images);
      } else if (uploadType === 'audio' && audioFile) {
        throw new Error('Audio transcription is not implemented yet');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate images');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = async (imageId: number) => {
    // Implement regeneration logic here
    console.log('Regenerating image:', imageId);
  };

  const handleAspectRatioChange = (aspectRatio: AspectRatio) => {
    setSettings({ ...settings, aspectRatio });
  };

  const isInputValid = uploadType === 'text' ? script.length > 0 : audioFile !== null;

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <Header />
        
        <div className="card-gradient rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setUploadType('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                uploadType === 'text'
                  ? 'bg-[#FFD700] text-black'
                  : 'btn-secondary'
              }`}
            >
              <FileText className="w-5 h-5" />
              Text Input
            </button>
            <button
              onClick={() => setUploadType('audio')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                uploadType === 'audio'
                  ? 'bg-[#FFD700] text-black'
                  : 'btn-secondary'
              }`}
            >
              <Mic className="w-5 h-5" />
              Audio Input
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">
              {uploadType === 'text' ? 'Enter Your Script' : 'Upload Audio File'}
            </h2>
            {uploadType === 'text' ? (
              <TextInput value={script} onChange={setScript} />
            ) : (
              <AudioUpload onFileSelect={setAudioFile} />
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Choose Style</h2>
            <StyleSelector
              selectedStyle={settings.style}
              onStyleSelect={(style) =>
                setSettings({ ...settings, style })
              }
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Aspect Ratio</h2>
            <AspectRatioSelector
              value={settings.aspectRatio}
              onChange={handleAspectRatioChange}
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 gradient-text">Image Settings</h2>
            <ImageSettings
              imagesPerSentence={settings.imagesPerSentence}
              onSettingsChange={(value) =>
                setSettings({ ...settings, imagesPerSentence: value })
              }
            />
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={!isInputValid || isGenerating}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Images'
            )}
          </button>
        </div>

        <GeneratedImages
          images={generatedImages}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
}

export default App;