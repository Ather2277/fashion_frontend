// File: ShareButton.tsx
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface ShareButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
  bgColor: string;
  color: string;
  title?: string;
  label?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  icon: Icon,
  onClick,
  className,
  bgColor,
  color,
  title,
  label
}) => {
  return (
    <button
      onClick={onClick}
      title={title} // ✅ Tooltip shown on hover
      className={`flex items-center justify-center px-2 py-1 ${className}`}
      style={{ backgroundColor: bgColor || 'purple', color }} // Default purple if no bgColor passed
    >
      <Icon className="w-4 h-4" />
      {label && <span className="ml-1 text-sm">{label}</span>}
    </button>
  );
};
