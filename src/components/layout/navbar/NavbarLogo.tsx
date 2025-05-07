
import { Link } from 'react-router-dom';

export function NavbarLogo() {
  return (
    <Link 
      to="/" 
      className="text-2xl font-bold tracking-tighter"
    >
      Style<span className="text-purple-600">AI</span>
    </Link>
  );
}
