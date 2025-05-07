
import { Link } from 'react-router-dom';
import { UserMenu } from './UserMenu';

export function DesktopNavigation() {
  return (
    <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="font-medium hover:text-purple-600 transition-colors">
        Home
      </Link>
      <Link to="/ai-outfit-generator" className="font-medium hover:text-purple-600 transition-colors">
        AI Outfit Generator
      </Link>
      <Link to="/gallery" className="font-medium hover:text-purple-600 transition-colors">
        Gallery
      </Link>
      <Link to="/pricing" className="font-medium hover:text-purple-600 transition-colors">
        Pricing
      </Link>
      
      <UserMenu />
    </div>
  );
}
