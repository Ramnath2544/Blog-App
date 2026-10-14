import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  TextInput,
} from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { avatarUrl } from '../constants/defaultAvatarUrl';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header3D() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg'
          : 'bg-white dark:bg-gray-900 border-b-2'
      }`}
    >
      <Navbar className="bg-transparent border-0">
        <Link
          to='/'
          className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <span className='px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl text-white shadow-lg group-hover:shadow-2xl transition-all duration-300 inline-block font-bold'>
              Blogify
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity -z-10"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </Link>

        <form onSubmit={handleSubmit} className="relative">
          <motion.div
            whileFocus={{ scale: 1.02 }}
            className="relative"
          >
            <TextInput
              type='text'
              placeholder='Search...'
              rightIcon={AiOutlineSearch}
              className='hidden lg:inline'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </form>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
          </Button>
        </motion.div>

        <div className='flex gap-3 md:order-2 items-center'>
          <motion.button
            onClick={() => dispatch(toggleTheme())}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`cursor-pointer w-11 h-11 hidden sm:flex items-center justify-center rounded-full transition-all duration-500 relative overflow-hidden
              ${
                theme === 'light'
                  ? 'bg-gradient-to-br from-amber-300 to-orange-400 shadow-lg shadow-orange-500/50'
                  : 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-purple-500/50'
              }`}
          >
            <AnimatePresence mode="wait">
              {theme === 'light' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 180, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaSun className='text-white text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -180, scale: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaMoon className='text-white text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]' />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Animated Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/30"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.button>

          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative"
                >
                  <Avatar
                    className='cursor-pointer ring-2 ring-purple-500 ring-offset-2'
                    alt='user'
                    img={avatarUrl(currentUser.profilePicture)}
                    rounded
                  />
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              }
            >
              <DropdownHeader>
                <span className='block text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500'>
                  @{currentUser.username}
                </span>
                <span className='block text-sm font-medium truncate'>
                  {currentUser.email}
                </span>
              </DropdownHeader>
              <Link to={'/dashboard?tab=profile'}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </Dropdown>
          ) : (
            <Link to='/sign-in'>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className='cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 border-0'
                  gradientduotone='purpleToBlue'
                >
                  Sign In
                </Button>
              </motion.div>
            </Link>
          )}

          <NavbarToggle className='cursor-pointer' />
        </div>

        <NavbarCollapse>
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/projects', label: 'Projects' },
          ].map((item, idx) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <NavbarLink
                as={Link}
                to={item.path}
                active={path === item.path}
                className={path === item.path ? 'text-purple-500 font-bold' : ''}
              >
                {item.label}
              </NavbarLink>
            </motion.div>
          ))}
        </NavbarCollapse>
      </Navbar>
    </motion.nav>
  );
}
