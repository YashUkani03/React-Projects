import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [{
        id: 1,
        text: 'Task Completed',
        completed: false
    }]
}

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const task = {
                text: action.payload
            }
            state.tasks.push(task)
        },

        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
        },

        updateTask: (state, action) => {
            state.tasks = state.tasks.map((prev) => prev.id === state.id ? action.payload : prev)
        },

        toggleTask: (state) => {
            state.tasks = state.tasks.map((prev) => prev.id === state.id ? { ...prev, completed: !prev.completed } : false)
        }
    }
})

export const { addTask, removeTask, updateTask, toggleTask } = taskSlice.actions

export default taskSlice.reducer