const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const Todo = require("../models/todo")

const ensureObjectId = (id, res) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: '유효하지 않은 ID형식입니다.' })

        return false
    }
    return true
}

router.post("/", async (req, res) => {
    try {
        const newTodo = new Todo(req.body)
        const saveTodo = await newTodo.save()
        res.status(201).json(saveTodo)
    } catch (error) {
        res.status(400).json({ error: "할 일을 저장하지 못 했습니다." })

    }
})

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 })

        res.status(201).json(todos)
    } catch (error) {
        res.status(400).json({ error: "데이터를 불러오지 못 했습니다." })

    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.isValidObjectId(id, res)) return

        const todo = await Todo.findById(id)
        if (!todo) {
            return res.status(404).json({ message: '해당 Id의 todo가 없습니다.' })
        }

        res.status(201).json({ message: "1개 불러오기 성공", todo })
    } catch (error) {
        res.status(400).json({ error: "데이터를 불러오지 못 했습니다." })

    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body

        if (!mongoose.isValidObjectId(id, res)) return

        const updated = await Todo.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        })
        if (!updated) {
            return res.status(404).json({ message: '해당 Id의 todo가 없습니다.' })
        }

        res.status(201).json({ message: "1개 수정하기 성공", updated })
    } catch (error) {
        res.status(400).json({ error: "데이터를 불러오지 못 했습니다." })

    }
})

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params


        if (!mongoose.isValidObjectId(id, res)) return

        const deleted = await Todo.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({ message: '해당 Id의 todo가 없습니다.' })
        }

        const remaining = await Todo.find().sort({ createdAt: -1 })

        res.status(201).json({
            message: "1개 삭제하기 성공",
            deleted: deleted._id,
            todos: remaining
        })
    } catch (error) {
        res.status(400).json({ error: "데이터를 불러오지 못 했습니다." })

    }
})

router.patch("/:id/check", async (req, res) => {
    try {
        const { id } = req.params;

        const { isCompleted } = req.body
        if (!ensureObjectId(id, res)) return;

        if (typeof isCompleted !== 'boolean') {
            return res.status(400).json({ message: "isCompleted는 boolean이어야 합니다." })
        }

        const updated = await Todo.findByIdAndUpdate(
            id,
            { isCompleted },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        )
        if (!updated) {
            return res.status(404).json({ message: "해당 ID의 todo가 없습니다." })
        }
        return res.status(200).json({ message: "체크상태 수정 성공", todo: updated })

    } catch (error) {

        return res.status(500).json({ message: "수정중 오류가 발생", error })

    }
})

router.patch("/:id/text", async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.isValidObjectId(id, res)) return

        const { text } = req.body

        if (!text || !text.trim()) {
            return res.status(400).json({ message: "text는 필수입니다" })
        }


        const updated = await Todo.findByIdAndUpdate(id,
            { text: text.trim() },
            { new: true, runValidators: true, context: 'query' }
        )
        if (!updated) {
            return res.status(404).json({ message: '해당 Id의 todo가 없습니다.' })
        }

        res.status(201).json({ message: "체크상태 수정하기 성공", todo: updated })
    } catch (error) {
        res.status(400).json({ error: "데이터를 불러오지 못 했습니다." })

    }
})






module.exports = router