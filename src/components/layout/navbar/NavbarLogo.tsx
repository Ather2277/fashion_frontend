
import { Link } from 'react-router-dom';

export function NavbarLogo() {
  return (
    <Link 
      to="/" 
      className="text-2xl font-bold tracking-tighter"
    >
      SU<span className="text-purple-600">vastra</span>
    </Link>
  );
}
