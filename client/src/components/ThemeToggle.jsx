import { Button } from 'flowbite-react';
import { useTheme } from '../contexts/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi2';

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <Button
      onClick={handleToggle}
      size="sm"
      color="white"
      className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all duration-200"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <HiSun className="w-4 h-4 text-yellow-500" />
      ) : (
        <HiMoon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
      )}
    </Button>
  );
};

export default ThemeToggle;
