
import React from 'react';

interface DesignsHeaderProps {
  title: string;
  prompt?: string;
}

export function DesignsHeader({ title, prompt }: DesignsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-semibold">{title}</h2>
        {prompt && (
          <p className="text-gray-600 mt-1">Prompt: "{prompt}"</p>
        )}
      </div>
    </div>
  );
}
