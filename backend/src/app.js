require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 4000;
require('./db/conn.js')
const registrationModel = require('./models/registrationSchema.js');
const auth_route = require('./routers/auth-route.js');
const list_route = require('./routers/list-route.js');
const errorMiddleware = require('./middlewares/error-middleware.js');

app.use(cors())
app.use(express.json());

app.use("/api/auth",auth_route);
app.use("/api/list",list_route);
app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`listening on ${port}`);
})