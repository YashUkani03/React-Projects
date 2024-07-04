import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    tasks: [{
        id: 1,
        data: 'Task Completed',
        status: 'completed'
    }]
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = {
                id : nanoid(),
                data: action.payload,
                status : 'pending'
            }
            state.tasks.push(task)
        },

        removeTask: (state,id) => {
            state.tasks = state.tasks.filter((task) => task.id !== id)
        },

        editTask: (state, action) => {
            state.tasks = state.tasks.map((prev) => prev.id === state.id ? action.payload : prev)
        },

        toggleTask: (state) => {
            state.tasks = state.tasks.map((prev) => prev.id === state.id ? { ...prev, status: !prev.pending } : false)
        }
    }
})

export const { addTask, removeTask, editTask, toggleTask } = taskSlice.actions

export default taskSlice.reducer