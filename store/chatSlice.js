import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chats",
    initialState: {
        chatsData: {}
    },
    reducers: {
        setChatsData: (state, action) => {
            state.chatsData = { ...action.payload.chatsData };
        }
    }
});
export const setChatsData = chatSlice.actions.setChatsData;
export default chatSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const chatSlice = createSlice({
//   name: "chats",
//   initialState: {
//     chatsData: {}, // Store chats data as a key-value pair or in any other format
//   },
//   reducers: {
//     setChatsData: (state, action) => {
//       const { chatsData } = action.payload;
//       // Instead of copying the entire chatsData object, update only necessary parts
//       state.chatsData = chatsData;
//     },
//     addChat: (state, action) => {
//       const { chatId, chatData } = action.payload;
//       // Add or update a specific chat entry instead of copying all chatsData
//       state.chatsData[chatId] = chatData;
//     },
//     removeChat: (state, action) => {
//       const { chatId } = action.payload;
//       // Delete a specific chat entry to optimize memory usage
//       delete state.chatsData[chatId];
//     },
//   },
// });

// export const { setChatsData, addChat, removeChat } = chatSlice.actions;
// export default chatSlice.reducer;
