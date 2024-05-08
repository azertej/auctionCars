import { configureStore } from '@reduxjs/toolkit'
import { loadersSlice } from './loadersSlice'
import { userSlides } from './UsersSlice'

const store = configureStore({
    reducer: {
        loaders: loadersSlice.reducer,
        users: userSlides.reducer

    }
})

export default store