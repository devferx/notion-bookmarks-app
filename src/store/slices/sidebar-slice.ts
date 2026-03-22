import { createSlice } from '@reduxjs/toolkit'

type SidebarState = {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false,
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen
    },
    closeSidebar: (state) => {
      state.isOpen = false
    },
    openSidebar: (state) => {
      state.isOpen = true
    },
  },
})

export const { toggleSidebar, closeSidebar, openSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer
