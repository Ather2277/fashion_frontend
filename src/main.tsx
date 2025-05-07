
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

// Add custom animation for image glow effect
const style = document.createElement('style');
style.textContent = `
  @keyframes image-glow {
    0% {
      opacity: 0.8;
      transform: translate(0);
    }
    25% {
      opacity: 0.6;
      transform: translate(5%, 5%);
    }
    50% {
      opacity: 0.8;
      transform: translate(10%, -5%);
    }
    75% {
      opacity: 0.6;
      transform: translate(-5%, 10%);
    }
    100% {
      opacity: 0.8;
      transform: translate(0);
    }
  }

  @keyframes text-shimmer {
    0% {
      background-position: 0% 50%;
    }
    100% {
      background-position: 100% 50%;
    }
  }

  .animate-image-glow {
    animation: image-glow 10s ease-in-out infinite;
  }

  .animate-text-shimmer {
    animation: text-shimmer 2s linear infinite;
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
    animation-delay: calc(var(--delay) * 100ms);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

const root = createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
