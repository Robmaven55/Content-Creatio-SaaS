export type AspectRatio = '1:1' | '16:9' | '4:3' | '3:2' | '2:3' | '3:4' | '9:16';

export type StyleOption = {
  id: string;
  name: string;
  description: string;
  icon: string;
  promptPrefix: string;
};

export type ImageGenerationSettings = {
  style: string;
  imagesPerSentence: number;
  aspectRatio: AspectRatio;
};

export type UploadType = 'text' | 'audio';

export type GeneratedImage = {
  id: number;
  imageUrl: string;
  prompt: string;
  sentence: string;
};