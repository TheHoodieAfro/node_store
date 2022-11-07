import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import debug from "debug";
import connect from './utils/connection.js';
import routes from "./routes/index.js";

dotenv.config()

const app = express()
const port = Number(process.env.PORT) || 4000;
const debuglog = debug('app')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Express server')
})

routes(app)
connect()
app.listen(port, () => {
    debuglog('Application running')
    console.log('Server is running on port '+ port)
})