import {
  Footer,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from 'react-icons/bs';
import { motion } from 'framer-motion';

export default function FooterCom() {
  return (
    <Footer container className='border-t-4 border-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
      <div className='w-full max-w-7xl mx-auto py-12 px-6'>
        <div className='grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                className='px-4 py-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl text-white inline-block shadow-lg'
              >
                Blogify
              </motion.span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your gateway to knowledge, creativity, and inspiration in the tech world.
            </p>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FooterTitle title='About' className='text-purple-600 dark:text-purple-400' />
            <FooterLinkGroup col>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 JS Projects
                </FooterLink>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink as={Link} to='/about'>
                  Blogify
                </FooterLink>
              </motion.div>
            </FooterLinkGroup>
          </motion.div>

          {/* Follow Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FooterTitle title='Follow us' className='text-purple-600 dark:text-purple-400' />
            <FooterLinkGroup col>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink
                  href='https://www.github.com/ramnath-dev'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </FooterLink>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink href='#'>Discord</FooterLink>
              </motion.div>
            </FooterLinkGroup>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FooterTitle title='Legal' className='text-purple-600 dark:text-purple-400' />
            <FooterLinkGroup col>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink href='#'>Privacy Policy</FooterLink>
              </motion.div>
              <motion.div whileHover={{ x: 5 }} className="transition-all">
                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
              </motion.div>
            </FooterLinkGroup>
          </motion.div>
        </div>

        <FooterDivider className="my-8 border-purple-200 dark:border-purple-800" />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <FooterCopyright
              href='#'
              by="Blogify"
              year={new Date().getFullYear()}
              className="text-gray-600 dark:text-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className='flex gap-6 mt-4 sm:mt-0 sm:justify-center'
          >
            {[
              { icon: BsFacebook, href: '#', color: 'hover:text-blue-600' },
              { icon: BsInstagram, href: '#', color: 'hover:text-pink-600' },
              { icon: BsTwitter, href: '#', color: 'hover:text-cyan-500' },
              { icon: BsGithub, href: 'https://github.com/ramnath-dev', color: 'hover:text-gray-800 dark:hover:text-white' },
              { icon: BsDribbble, href: '#', color: 'hover:text-pink-500' },
            ].map((social, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <FooterIcon
                  href={social.href}
                  icon={social.icon}
                  className={`text-gray-500 ${social.color} transition-colors`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Footer>
  );
}
