const {GoogleSpreadsheet} = require('google-spreadsheet')

const credentials = require('./credential.json')

const doc = new GoogleSpreadsheet('1uSEvcjwhvV9ISYO0HMefleRy7SnNywG225JknWHmVf8')

const run = async ()=>{
  
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()
  console.log(doc.title)
}

run()