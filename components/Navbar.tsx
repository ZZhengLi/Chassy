import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsSearch } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import Icon from './icon';
import classNames from 'classnames';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState('home');

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <nav className='lg:flex items-center flex-wrap bg-primary p-3 sticky top-0 hidden'>
        <Link href='/' className='inline-flex items-center p-2 mr-4'>
          <Image src='/navlogo.svg' alt='Chassy' width={100} height={40} />
        </Link>

        {/* <button
          className=' inline-flex p-3 hover:bg-light rounded lg:hidden text-primary ml-auto hover:text-primary outline-none'
          onClick={handleClick}
        >
        <svg
        className='w-6 h-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
        >
        <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M4 6h16M4 12h16M4 18h16'
            />
            </svg>
          </button> */}
        {/*Note that in this div we will use a ternary operator to decide whether or not to display the content of the div  */}

        {/* <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-row lg:h-auto'>
          <BsSearch className='text-dark' />
          <FaUserCircle className='text-light' />
        </div> */}

        {/* <div
          className={`${
            open ? '' : 'hidden'
          }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
        > */}
        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto'>
          <Link href="/home"
            className={classNames('lg:inline-flex lg:w-auto w-full px-3 py-2 text-[#F9F5EC] font-medium items-center justify-center hover:underline',
              {
                'underline': menu === 'home'
              }
            )}>
            หน้าแรก

          </Link>
          <Link href='/home'>
            <div onClick={() => setMenu('home')}>
              {menu == 'home' ? (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline underline'>
                  หน้าแรก
                </a>
              ) : (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline'>
                  หน้าแรก
                </a>
              )}
            </div>
          </Link>
          <Link href='/shop'>
            <div onClick={() => setMenu('shop')}>
              {menu == 'shop' ? (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline underline'>
                  ร้าน
                </a>
              ) : (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline'>
                  ร้าน
                </a>
              )}
            </div>
          </Link>
          <Link href='/employee'>
            <div onClick={() => setMenu('employee')}>
              {menu == 'employee' ? (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline underline'>
                  พนักงาน
                </a>
              ) : (
                <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline'>
                  พนักงาน
                </a>
              )}
            </div>
          </Link>
          <Link href='/'>
            <div>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 text-light font-medium items-center justify-center hover:underline focus:underline'>
                ติดต่อเรา
              </a>
            </div>
          </Link>
          <div className='flex flex-row items-center text-light'>
            <div className='mr-5'>
              <form action='' className='relative mx-auto w-max'>
                <div className='relative flex flex-row items-center'>
                  <div className='absolute pl-3'>
                    <Icon icon='search' size={24} />
                  </div>
                  <input
                    type='search'
                    className='peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-light focus:pl-16 focus:pr-4'
                  />
                </div>
              </form>
            </div>

            <FaUserCircle className='w-6 h-6' />
          </div>
        </div>
        {/* </div> */}
      </nav>

      <nav className='flex items-center justify-center bg-light w-full sticky top-0 lg:hidden'>
        <div className='text-dark justify-between flex flex-row w-full px-6 pt-10 pb-[14px] items-center'>
          <p className='text-2xl font-medium text-center'>หน้าแรก</p>
          <div className='flex flex-row items-center'>
            <div className='mr-5'>
              <form action='' className='relative mx-auto w-max'>
                <div className='relative flex flex-row items-center'>
                  <div className='absolute pl-3'>
                    <Icon icon='search' size={24} />
                  </div>
                  <input
                    type='search'
                    className='peer cursor-pointer relative z-10 h-12 w-12 rounded-full bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border focus:border-dark focus:pl-16 focus:pr-4'
                  />
                </div>
              </form>
            </div>
            <FaUserCircle className='w-6 h-6' />
          </div>
        </div>
      </nav>

      <nav className='flex items-center justify-center bg-primary w-full h-20 lg:hidden bottom-0 fixed'>
        <div className='w-full items-center flex flex-row justify-center text-center'>
          <Link href='/home'>
            <div
              className='flex flex-col items-center justify-center w-full h-full'
              onClick={() => setMenu('home')}
            >
              {menu == 'home' ? (
                <>
                  <Icon icon='home-filled' size={24} />
                  <a className='font-normal text-xs text-center text-light'>
                    หน้าแรก
                  </a>
                </>
              ) : (
                <>
                  <Icon icon='home' size={24} className='text-dark' />
                  <a className='font-normal text-xs text-center text-dark'>
                    หน้าแรก
                  </a>
                </>
              )}
            </div>
          </Link>
          <Link href='/shop'>
            <div
              className='flex flex-col items-center justify-center text-dark w-full h-full'
              onClick={() => setMenu('shop')}
            >
              {menu == 'shop' ? (
                <>
                  <Icon icon='shop-filled' size={24} />
                  <a className='font-normal text-xs text-center text-light'>
                    ร้าน
                  </a>
                </>
              ) : (
                <>
                  <Icon icon='shop' size={24} className='text-dark' />
                  <a className='font-normal text-xs text-center  text-dark'>
                    ร้าน
                  </a>
                </>
              )}
            </div>
          </Link>
          <Link href='/'>
            <div
              className='mb-20 w-full justify-center items-center flex'
              onClick={() => setMenu('add')}
            >
              <div className='w-24 h-24 border-white rounded-full border-4 bg-primary flex justify-center items-center'>
                <Icon
                  icon='add'
                  size={60}
                  className='text-dark hover:text-light'
                />
              </div>
            </div>
          </Link>
          <Link href='/employee'>
            <div
              className='flex flex-col items-center justify-center w-full h-full'
              onClick={() => setMenu('employee')}
            >
              {menu == 'employee' ? (
                <>
                  <Icon icon='employee-filled' size={24} />
                  <a className='font-normal text-xs text-center  text-light'>
                    พนักงาน
                  </a>
                </>
              ) : (
                <>
                  <Icon icon='employee' size={24} className='text-dark' />
                  <a className='font-normal text-xs text-center  text-dark'>
                    พนักงาน
                  </a>
                </>
              )}
            </div>
          </Link>
          <Link href='/setting'>
            <div
              className='flex flex-col items-center justify-center text-dark w-full h-full'
              onClick={() => setMenu('settings')}
            >
              {menu == 'settings' ? (
                <>
                  <Icon icon='settings-filled' size={24} />
                  <a className='font-normal text-xs text-center  text-light'>
                    ตั้งค่า
                  </a>
                </>
              ) : (
                <>
                  <Icon icon='settings' size={24} className='text-dark' />
                  <a className='font-normal text-xs text-center  text-dark'>
                    ตั้งค่า
                  </a>
                </>
              )}
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
