import React from "react"
import Layout from "../components/Layout"


import '../CSS/style.css'

const Myapp = ({Component,pageProps})=>{
  return(
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}
export default Myapp