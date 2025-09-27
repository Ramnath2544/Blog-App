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
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Navbar className='border-b-2 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-red-500 to-yellow-300 rounded-lg text-white'>
          Blogify
        </span>
      </Link>
      <form>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          color="gray"
        />
      </form>
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <ThemeToggle />
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                className='cursor-pointer'
                alt='user'
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <DropdownHeader>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </DropdownHeader>
            <Link to={'/dashboard?tab=profile'}>
              <DropdownItem>Profile</DropdownItem>
            </Link>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button
              className='cursor-pointer firebase-button'
              gradientduotone='purpleToBlue'
              outline
            >
              Sign In
            </Button>
          </Link>
        )}

        <NavbarToggle className='cursor-pointer' />
      </div>
      <NavbarCollapse>
        <NavbarLink as={Link} to='/' active={path === '/'}>
          Home
        </NavbarLink>
        <NavbarLink as={Link} to='/about' active={path === '/about'}>
          About
        </NavbarLink>
        <NavbarLink as={Link} to='/projects' active={path === '/projects'}>
          Projects
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
