import React from 'react';

const Header = ({title}) => {
  return (
    <header className='container'>
      <div className='flex flex-col-reverse items-center pt-2 sm:flex-row sm:justify-between'
      >
        <div className='flex flex-col items-center'>
          <p className='m-0 font-serif text-xl font-semibold text-orange-500'>Al-Watania Poultry</p>
          <p className='font-serif text-gray-600 '>Digital Transformation Dpt.</p>
          <p className='font-serif text-gray-600 '>BI & Solutions Unit</p>
        </div>
        <div>
          <p className='font-serif text-lg font-semibold text-gray-600'>{title}</p>
        </div>
        <img src="/logo.png" alt="logo" className='h-12 w-[80px]' />        
      </div>

      <hr className='border-[1px] border-[#898181] mt-2 '/>
    </header>
  );
};

export default Header;
