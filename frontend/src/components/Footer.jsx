/* eslint-disable react/no-unescaped-entities */
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {
  BsDiscord,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from 'react-icons/bs';

const FooterComp = () => {
  return (
    <Footer container className='border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5 mb-5'>
            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg font-semibold dark:text-white'
            >
              <span className='text-white px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
                Dada's
              </span>
              Blog
            </Link>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 sm:gap-6 gap-8 sm:mt-4'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link href='/' as={'div'}>
                  <Link to='/'>Home</Link>
                </Footer.Link>
                <Footer.Link href='/about' as={'div'}>
                  <Link to='/about'>About</Link>
                </Footer.Link>
                <Footer.Link href='/projects' as={'div'}>
                  <Link to='/projects'>Projects</Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Follow Us' />
              <Footer.LinkGroup col>
                <Footer.Link as={'div'}>
                  <Link to='/'>Github</Link>
                </Footer.Link>
                <Footer.Link as={'div'}>
                  <Link to='/'>Discord</Link>
                </Footer.Link>
                <Footer.Link as={'div'}>
                  <Link to='/'>Linkedin</Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link as={'div'}>
                  <Link to='/'>Privacy Policy</Link>
                </Footer.Link>
                <Footer.Link as={'div'}>
                  <Link to='/'>Terms &amp; Conditions</Link>
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        <Footer.Divider />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Dada's blog"
            year={new Date().getFullYear()}
          />

          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsDiscord} />
            <Footer.Icon href='#' icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
