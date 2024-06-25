const express = require('express');
const router = express.Router();
const todoList = require('../models/todoListSchema');
const fetchUser = require('../middlewares/fetchUser');


// *-------------------
// fetch user Data
// *-------------------
router.get('/fetchUserData', fetchUser, async (req, res) => {
    try {
        const userDataFind = await todoList.find({ user: req.user.userId });
        res.status(200).json(userDataFind[0].todolist);
    } catch (error) {
        res.status(500).json({ message: "not found user" });

    }
});
// *-------------------
// add first one data to database
// *-------------------
router.post('/addlist', fetchUser, async (req, res) => {
    try {
        const createList = await todoList.create({ user: req.user.userId, todolist: req.body });

        res.status(200).json({ msg: "success", data: createList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// *-------------------
// add first after data to database
// *-------------------
router.post('/addonelist/', fetchUser, async (req, res) => {
    try {
        const inputData = req.body;
        // const allDBData ={}
        const findList = await todoList.find({ user: req.user.userId });
        if (!findList) {
            return res.status(404).send({ msg: 'not found' });
        } else {
            const allDatabaseData = findList[0].todolist;

            allDatabaseData.push(inputData);

            const updateList = await todoList.updateOne({ user: req.user.userId }, {
                $set: {
                    todolist: allDatabaseData
                }
            }, {
                new: true
            }
            );
            res.status(200).json({ mse: updateList })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// *-------------------
// delete one list on database
// *-------------------
router.put('/delete/one/:id', fetchUser, async (req, res) => {
    try {
        const removeListId = req.params.id;
        const findList = await todoList.find({ user: req.user.userId });
        if (!findList) {
            return res.status(404).send({ msg: 'not found' });
        } else {
            const allDatabaseData = findList[0].todolist;
            const updateListAllData = allDatabaseData.filter((e) => {
                return e.id !== removeListId
            })
            const updateList = await todoList.updateOne({ user: req.user.userId }, {
                $set: {
                    todolist: updateListAllData
                }
            }, {
                new: true
            }
            );
            res.status(200).json({ message: "delete data" })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// *-------------------
// delete all list on database
// *-------------------

router.delete('/delete/all', fetchUser, async (req, res) => {
    const deleteUserData = await todoList.deleteOne({ user: req.user.userId });
    if (deleteUserData.deletedCount == 0) {
        res.status(400).json({ cod: "400", message: "Can't Delete Document" });
    } else {
        res.status(200).json({ cod: "200", message: "Delete all Data" });
    }
})

// *-------------------
// get edite data on database
// *-------------------

router.put('/update/data/:id', fetchUser, async (req, res) => {
    try {
        const editeId = req.params.id;
        const findList = await todoList.find({ user: req.user.userId });
        if (!findList) {
            return res.status(404).send({ msg: 'not found' });
        } else {
            const allDatabaseData = findList[0].todolist;
            //finde index
            // const index = allDatabaseData.map(i => i.id).indexOf(editeId);
            const index = allDatabaseData.findIndex(x => x.id === editeId);
            // change data
            const n = Math.abs(index);
            allDatabaseData[n] = req.body;
            // update data on database
            const update_After_allDatabaseData = findList[0].todolist;
            await todoList.updateOne({ user: req.user.userId }, {
                $set: {
                    todolist: update_After_allDatabaseData
                }
            }, {
                new: true
            }
            );
            res.status(200).json({ message: "sucefully update" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;