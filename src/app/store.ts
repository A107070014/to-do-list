import { createSlice, configureStore } from '@reduxjs/toolkit'

export type listType = {
  id: number;
  name: string;
  status: string;
};
export type stateType = {
  allData: listType[];
  activeTab: string;
}
export enum EStatus {
  All = 'all',
  Pending = 'pending',
  Completed = 'completed'
}
const slice = createSlice({
  name: 'slice',
  initialState: {
    allData: [],
    activeTab: EStatus.All
  } as stateType,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setAllData: (state, action) => {
      state.allData = action.payload
    },
    createData: (state, action) => {
      state.allData = [...state.allData, action.payload]
    },
    editData: (state, action) => {
      const data = state.allData.find(item => item.id === action.payload.id);
      if (data) data.status = action.payload.status;
    },
    deleteData: (state, action) => {
      state.allData = state.allData.filter(item => item.id !== action.payload);
    }
  }
})

export const { setActiveTab, setAllData, createData, editData, deleteData } = slice.actions

const store = configureStore({
  reducer: slice.reducer
})

export default store;