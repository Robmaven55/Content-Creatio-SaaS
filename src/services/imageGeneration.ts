import { ImageGenerationSettings, AspectRatio } from '../types';

function getAspectRatioDimensions(ratio: AspectRatio): { width: number; height: number } {
  const [w, h] = ratio.split(':').map(Number);
  const baseSize = 800;
  return {
    width: Math.round((baseSize * w) / Math.max(w, h)),
    height: Math.round((baseSize * h) / Math.max(w, h)),
  };
}

function getThemeKeyword(style: string, sentence: string): string {
  const styleKeywords = {
    realistic: 'photorealistic,detailed,4k,natural lighting',
    infographic: 'minimalist,clean,vector,infographic style',
    cartoon: 'cartoon,colorful,illustration,vibrant',
    cinematic: 'cinematic,dramatic lighting,movie scene,atmospheric',
  };
  
  return styleKeywords[style as keyof typeof styleKeywords] || 'abstract';
}

export async function generateImages(
  text: string,
  settings: ImageGenerationSettings
) {
  try {
    const sentences = text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const totalImages = Math.min(
      sentences.length * settings.imagesPerSentence,
      13
    );

    const step = Math.ceil(sentences.length / totalImages);
    const selectedSentences = sentences.filter((_, i) => i % step === 0).slice(0, totalImages);

    const { width, height } = getAspectRatioDimensions(settings.aspectRatio);

    return selectedSentences.map((sentence, index) => {
      const theme = getThemeKeyword(settings.style, sentence);
      const timestamp = Date.now();
      return {
        id: index,
        prompt: `${sentence} (${theme})`,
        imageUrl: `https://picsum.photos/seed/${theme}-${timestamp}-${index}/${width}/${height}`,
        sentence: sentence
      };
    });
  } catch (error) {
    console.error('Error generating images:', error);
    throw new Error('Failed to generate images');
  }
}