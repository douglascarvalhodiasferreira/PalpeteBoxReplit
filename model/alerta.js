import React from 'react'

export default function alerta({MSG:{MSG,setMSG}}) {
    //console.log(MSG)
  return (
    <div className='bg-red-400 border-2 border-red-600 rounded-md p-4 relative'>
        <div 
            onClick={()=>setMSG([])}
            className='max-w-min bg-red-600 rounded-full px-2 absolute top-1 right-1 hover:opacity-80 cursor-pointer'
        >
            X
        </div> 
        <div>
            {MSG.map((key,value)=>{
                return <p key={value}>{Object.values(key)[0]}</p>
            })}
        </div>
    </div>
  )
}