import React from 'react'
import Header from "../Header";
import Footer from "../Footer"

export default function Layout({children}) {
  return (
    <div className='min-w-[200px] max-w-[800px] mx-auto'>
      <Header/>
        <div>
          {children}
        </div>
      <Footer/>
    </div>
  )
}