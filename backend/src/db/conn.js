const mongoose = require('mongoose');
mongoose.connect(process.env.DETA_DB, { dbName: process.env.DB_NAME })
    // mongoose.connect("mongodb://127.0.0.1:27017/todo")

    .then(() => {
        console.log("connect to todo database");
    }).catch((e) => {
        console.log(e);
    })

module.exports = mongoose;