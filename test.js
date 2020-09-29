const express = require('express')
const path = require('path');
const e = require('express');
const app = express()

//Initialize routes
app.use(express.json())
app.use("/api",require("./routes/rooms"));

let port = 3001;
app.listen(port, function () {
	console.log(`App is running on port ${port}`)
})