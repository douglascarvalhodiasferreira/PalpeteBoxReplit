import React,{useState} from "react"
import {useRouter} from 'next/router'

import Alerta from '../model/alerta'
import PageTitle from "../components/PageTitle"


const Pesquisa = ()=>{

  const GeraCupom = ()=>{
    const timeStamp = new Date();
    const tmBase16=timeStamp.getTime().toString(16)
    const teste = tmBase16.replace(/([\w]{3})([\w]{4})([\w]{4})/g,(m,p1,p2,p3)=>{return [p1,p2,p3].join('-')})
    return teste.toUpperCase();
  }

  const [MSGRetorno, setMSGRetorno]= useState();
  const [form,setForm]=useState({Nome:'',	Email:'',	Whatssap:'', Cupom:GeraCupom(),	Promo:'', Opiniao:'', Nota:''})
  const [MSG,setMSG]= useState([])
  const [rodando,setRodando]=useState(false)
  const Nota = [0,1,2,3,4,5]

  const onclick = async()=>{
    console.log(form)
    const request = {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(form)
    }
    await fetch('/api/post-pesquisa',request)
      .then((res)=>res.json())
      .then(json=>{setMSGRetorno(json)})
      .catch ((err)=>console.log(err))
  }

  const validacao = ()=>{
    let alertas = []
    Object.keys(form).map((key, index, value)=>{
      if(index<3 && form[key] === ''){
          alertas.push({[key]:`Você não preencheu o ${key}`})
      }
      if(key === 'Whatssap'){
        const regexp = new RegExp(/(\(?[0-9]{2}\)?\s?)([0-9]{4,5}\-?[0-9]{4})/g)
        const test= regexp.test(form[key])
        if(!test){
          alertas.push({[key]:`Preencha o ${key} no formato correto`})
        }
      }else if(key === 'Email'){
        const regex=/(\w+\S\w+)(\@)(\D+)(\.)(\D+)/g
        !regex.test(form[key])
          &&alertas.push({[key]:`${key} não está no formato correto`})
      }
    })
    if(alertas.length===0){
      setRodando(true), 
      onclick()
    }else{
      setMSG(alertas)
    }
  }

  
  const replacer= (m,p1, p2, p3)=>{
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    let p_1 = p1||''
    let p_2 = p2||''
    let p_3 = p3||''
    return `(${p_1})${p_2}-${p_3}`;
  }

  const onchange = (e)=>{
    const nome=e.target.name;
    const value=e.target.value
    
    if(nome === 'Whatssap'){
      const regexnum= /\d*/g //;
      const regextel=/([0-9]{0,2})?([0-9]{0,5})?([0-9]{0,4})?/
      const ArrayNum = value.match(regexnum)
      let numeros='';
      for (let index = 0; index < ArrayNum.length; index++) {
        numeros += ArrayNum[index];
      }
      const tel = numeros.replace(regextel,replacer)
      setForm((prev)=>({...prev, [nome]:tel}))
    }else{
      setForm((prev)=>({...prev, [nome]:value}))      
    }
  }
  
  return(
    <>
      <PageTitle title='Pesquisa'/>
      {MSGRetorno
        ?(<div className='flex flex-col items-center'>
            <div className="text-center">
              Tire um print ou uma foto e apresente ao garçom no ato do pagamento.
            </div>
            <p>Cupom:</p>
            <div className='shadow-lg shadow-green-600 bg-gray-100 rounded-md p-2'>
              {MSGRetorno?.Cupom}
            </div>
            <div>
              {'Data do Cupom: '+ MSGRetorno?.Data}
            </div>
            <div className="text-center">
              {MSGRetorno?.Promo}
            </div>
            <small className="text-center">
              * Válido por 15 dias. <br/>
                Aceito apenas uma promoção por comanda/mesa.
            </small>
          </div>)
        :(<div className='flex flex-col items-center space-y-4 my-4'>
          {MSG.length > 0 && <Alerta MSG={{ MSG, setMSG }} />}
          <div className='flex flex-col  space-y-2 w-2/4'>
            <label className='text-left'> Nome </label>
            <input
              required
              name='Nome'
              value={form.Nome}
              type='text'
              className='bg-gray-100 border rounded border-gray-400 '
              onChange={onchange} />
            <label className='text-left'> Email </label>
            <input
              required
              name='Email'
              value={form.Email}
              type='email'
              className='bg-gray-100 border rounded border-gray-400 '
              onChange={onchange} />
            <label className='text-left'> Whatssap </label>
            <input
              required
              name='Whatssap'
              maxLength={14}
              placeholder="(xx)xxxxx-xxxx"
              value={form.Whatssap}
              type='tel'
              pattern={"/(\(?[0-9]{2}\)?\s?)?([0-9]{4,5}-[0-9]{4})/g"} //expReg valida telefone
              className='bg-gray-100 border rounded border-gray-400 '
              onChange={onchange} />
            <label>Deixe sua Opinião/Sugestão</label>
            <textarea
              name='Opiniao'
              onChange={onchange}
              className='bg-gray-100 border rounded border-gray-400 ' />
          </div>
          <label>Qual nota merece esse estabelecimento: </label>
          <div
            className="flex flex-row justify-center items-center space-x-2 "
            onChange={onchange}
          >
            {Nota.map((nota) => {
              return(
                <label key={nota}>
                  <span className="p-1">{nota}</span>
                  <input
                    type='radio'
                    name='Nota'
                    value= {nota} 
                  />
                </label>
              )
            })}
        </div>
        <button
          className='min-w-max bg-sky-300 rounded p-2 px-4 hover:bg-sky-500 hover:shadow-xl flex flex-row '
          onClick={() => { validacao(form) } }
        >
            {rodando
              ? (<><img src='progress.png' className="w-5 mr-2 animate-spin" />
                <p>Enviando</p></>)
              : 'Enviar'}
        </button>
        </div>)
      }
    </>

  )
}

export default Pesquisa