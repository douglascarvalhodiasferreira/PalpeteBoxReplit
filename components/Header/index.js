import React from 'react'
import Link from 'next/link'

const Header =()=>{
  return(
    <div className='bg-gray-200'>
      <div className='flex justify-center'>
        <img src='logo_palpitebox.png' alt='Home' className='p-4'/>
      </div>
      
      <div className='bg-gray-300 flex flex-row flex-wrap items-center space-x-2'>
        <Link href='/'>
          <a>
            <img className='grow-0 ml-2 w-15 h-10 hover:opacity-40  rounded' src='Home.png' alt='home'/>
          </a>
        </Link>
        <Link href="/sobre" >
          <a className='size-lg hover:bg-gray-400 p-2 rounded'>
            Sobre
          </a>
        </Link>
        <Link href="/contato">
          <a className='size-lg hover:bg-gray-400 p-2 rounded'>
            Contato
          </a>
        </Link>
        <Link href="/pesquisa">
          <a className='size-lg hover:bg-gray-400 p-2 rounded'>
            Pesquisa
          </a>
        </Link>
      </div>
    </div>
  )
}
export default Header;
