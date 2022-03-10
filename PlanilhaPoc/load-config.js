const {GoogleSpreadsheet} = require('google-spreadsheet')

const credentials = require('./credential.json')

const doc = new GoogleSpreadsheet('1uSEvcjwhvV9ISYO0HMefleRy7SnNywG225JknWHmVf8')

const run = async ()=>{
  try{
    await doc.useServiceAccountAuth(credentials)
    await doc.loadInfo()
    
    const sheet = doc.sheetsByIndex[1]
    //Nome	Email	Whatssap	Cupom	Promo
    await sheet.addRow({
      Nome:'Douglas',
      Email:'douglas.ferreira@hotmail.com',
      Whatssap:'(31)98889-1630',
      Cupom:'aaaadfa',
      Promo:'sdfaf'
    })
    console.log('ok')


  }catch(err){
    console.error(err)
  }
  
  //console.log(doc.title)
  //await sheet.loadCells("A3:B3")
  //const mostrarPromocaoCell = sheet.getCell(2,0).value
  //const textoCell = sheet.getCell(2,1).value

  //console.log(mostrarPromocaoCell,"\n",textoCell)
  
  
}

run()