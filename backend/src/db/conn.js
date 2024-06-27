const mongoose = require('mongoose');
mongoose.connect(process.env.DETA_DB, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log("connect to todo database");
    }).catch((e) => {
        console.log(e);
    })

module.exports = mongoose;