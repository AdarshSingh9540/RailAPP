import React from 'react';

function Header() {
    return (
      <div className='header bg-blue-800 text-white bg-opacity-85 w-full h-20 flex justify-between items-center fixed top-0 left-0 z-10'>
        <div className='w-16 h-auto m-4 rounded-lg'>
          <img src="https://www.vhv.rs/dpng/d/398-3987834_indian-railways-logo-hd-png-download.png" alt="logo" className='w-full rounded-full'/>
        </div>
        <div className='flex m-4'>
          <ul className='flex flex-row m-4 px-4 text-lg font-serif text-white'>
            <li className='mx-6'>Home</li>
            <li className='mx-6'>Contact us</li>
            <li className='mx-6'>About us</li>
            <li className='mx-6'>Check PNR </li>
          </ul>
        </div>
      </div>
    );
  }
  
  export default Header;
  
