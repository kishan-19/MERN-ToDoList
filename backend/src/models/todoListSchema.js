const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    todolist: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
const todoListModel = new mongoose.model("Todolist", todoListSchema);

module.exports = todoListModel;
