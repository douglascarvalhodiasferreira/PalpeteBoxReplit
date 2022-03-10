const {GoogleSpreadsheet} = require('google-spreadsheet')

const credentials = require('./credential.json')

const doc = new GoogleSpreadsheet('1uSEvcjwhvV9ISYO0HMefleRy7SnNywG225JknWHmVf8')

const run = async ()=>{
  
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()
  console.log(doc.title)

  const sheet = doc.sheetsByIndex[2]
  await sheet.loadCells("A3:B3")
  const mostrarPromocaoCell = sheet.getCell(2,0).value
  const textoCell = sheet.getCell(2,1).value

  console.log(mostrarPromocaoCell,"\n",textoCell)
  
  
}

run()