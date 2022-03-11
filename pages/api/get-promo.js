import {GoogleSpreadsheet} from 'google-spreadsheet'
import {fromBase64} from '../../utils/Base64' 

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID)

export default async (req,res)=>{
  try {
    await doc.useServiceAccountAuth({
      client_email: process.env.SHEET_CLIENTE_EMAIL,
      private_key: fromBase64(process.env.SHEET_PRIVATE_KEY)
    })
    await doc.loadInfo()
  
    const sheet = doc.sheetsByIndex[2];
  
    //console.log(sheet.title)
  
    await sheet.loadCells('A3:B3')
  
    const ativarPromocao = sheet.getCell(2,0).value
    const textoPromocao = sheet.getCell(2,1).value
   
    res.end(JSON.stringify({
      showCupon:ativarPromocao,
      message: textoPromocao
    }))
  } catch (error) {
    console.log(error),
    res.end(JSON.stringify({
      showCupon:'',
      message: ''
    }))
  }

}
  