const connectToMongo = require("./db.js")
const express = require('express')
var cors = require('cors')

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())


//Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/buses", require("./routes/buses"));
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));

app.get('/', (req, res) => {
  res.send('Hello Yash!')
})

app.listen(port, () => {
    connectToMongo();
  console.log(`fakeBus backend listening on port ${port}`)
})