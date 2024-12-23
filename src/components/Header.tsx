import React from 'react';
import { Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="text-center py-16 px-4">
      <div className="flex justify-center mb-8">
        <img
          src="https://raw.githubusercontent.com/yourusername/yourrepo/main/logo.png"
          alt="Logo"
          className="w-16 h-16"
        />
      </div>
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        <span className="gradient-text">Transform Your Ideas</span>
        <br />
        Into Visual Stories
      </h1>
      <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
        Create stunning visuals from your text or audio in seconds using advanced AI technology
      </p>
      <div className="inline-flex items-center gap-2 bg-zinc-800/50 px-4 py-2 rounded-full text-sm text-zinc-300">
        <Sparkles className="w-4 h-4 text-[#FFD700]" />
        Powered by Advanced AI Technology
      </div>
    </header>
  );
}