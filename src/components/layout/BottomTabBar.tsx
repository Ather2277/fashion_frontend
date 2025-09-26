import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Wand2, Images, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type TabItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const tabs: TabItem[] = useMemo(
    () => [
      { label: 'Home', path: '/', icon: Home },
      { label: 'AI Outfit', path: '/ai-outfit-generator', icon: Wand2 },
      { label: 'Gallery', path: '/gallery', icon: Images },
      { label: 'Pricing', path: '/pricing', icon: DollarSign },
    ],
    []
  );

  const activeIndex = useMemo(() => {
    const idx = tabs.findIndex((t) =>
      t.path === '/' ? location.pathname === '/' : location.pathname.startsWith(t.path)
    );
    return idx === -1 ? 0 : idx;
  }, [location.pathname, tabs]);

  const indicatorTranslate = `translateX(${activeIndex * 100}%)`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[70] border-t border-gray-200/70 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-4xl">
        <div className="relative grid grid-cols-4">
          {/* Active indicator */}
          <div
            className="absolute bottom-0 left-0 h-0.5 w-1/4 bg-purple-600 transition-transform duration-300"
            style={{ transform: indicatorTranslate }}
          />

          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = index === activeIndex;
            return (
              <button
                key={tab.path}
                onClick={() => {
                  if (!isAuthenticated && tab.path !== '/') {
                    navigate('/login');
                  } else {
                    navigate(tab.path);
                  }
                }}
                className="flex flex-col items-center justify-center py-2.5 gap-1 transition-colors"
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={
                    isActive
                      ? 'h-5 w-5 text-purple-600'
                      : 'h-5 w-5 text-gray-500'
                  }
                />
                <span
                  className={
                    isActive
                      ? 'text-xs font-medium text-purple-700'
                      : 'text-xs text-gray-600'
                  }
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}


