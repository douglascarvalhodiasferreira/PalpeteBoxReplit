import React from 'react'
import Link from "next/link"
import useSWR from 'swr'

const fetcher = (...args)=> fetch(...args).then(res=>res.json())

const Index = ()=>{
  const{data, error}=useSWR('/api/get-promo', fetcher)
  let promo = data||null;
  return (  
    <div className='text-center flex flex-col space-y-10 my-5'>
      <h4>
        O restaurante X sempre busca atender melhor seus clientes.<br/>
        Por isso, estamos sempre abertos a ouvir a sua opinião
      </h4>
      {!data
        ?<p>Carregando...</p>
        :data.showCupon && !error
          &&<div>
              <div className='flex justify-center'>
                <Link href={{
                  pathname:'/pesquisa',
                  query:{promo:promo.message}
                  }}
                >
                  <a>
                    <h3 className='min-w-max bg-sky-300 rounded p-4 hover:bg-sky-500 hover:shadow-xl'>
                      Dar sua Opinião/Sugestão
                    </h3>
                  </a>
                </Link>
              </div>
              <br/><br/>
            {data.message}
           </div>
      }
    </div>
  )
}

export default Index