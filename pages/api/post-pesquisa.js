import {GoogleSpreadsheet} from 'google-spreadsheet'

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)
const fromBase64 = value =>{
  const buff= Buffer.from(value,'base64');
  return buff.toString('ascii');
}

export default async (req,res)=>{
  const { Nome,
          Email,
          Whatssap,
          Cupom, 
          Opiniao,
          Nota
        } = req.body;

  const Data =()=>{
    const zero=(d)=>{
      if(d<10){return `0${d}`
      }else{return d}
    }
    const newDate = new Date()
    const data = zero(newDate.getDate());
    const mes = zero(newDate.getMonth()+1);
    const ano = newDate.getFullYear().toString();
    return [data,mes,ano].join('/');
  }
  const dataMSG = Data()
   
  await doc.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENTE_EMAIL,
    private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
  })
  await doc.loadInfo()

  const sheet = doc.sheetsByIndex[1];
  const sheet2 = doc.sheetsByIndex[2];
  await sheet2.loadCells('A3:B3')


  const textoPromocao = sheet2.getCell(2,1).value

  await sheet.addRow({ 
    Nome:Nome,
    Email:Email,
    Whatssap:Whatssap,	
    Cupom:Cupom,
    Promo:textoPromocao,
    Opiniao:Opiniao,
    Nota:Nota,
    Data:dataMSG
  })

  const recebido = JSON.stringify({
    Cupom:Cupom,
    Promo:textoPromocao,
    Data:dataMSG
  });
  
  res.json(recebido)
}