const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World! alterado')
})

app.listen(port, () => {
  console.log(`Servidor na porta: ${port} ${new Date()}`)
})