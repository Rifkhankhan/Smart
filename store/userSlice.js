import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    orderedUsers: {},
    isUsersLoading: false,
  },
  reducers: {
    setStoredUsers: (state, action) => {
      const newUsers = action.payload;

      for (let i = 0; i < newUsers.length; i++) {
        const data = newUsers[i];

        if (!state.users.find((user) => user.uid === data.uid)) {
          state.users.push(data);
        }
      }
    },

    setOrderedUsers: (state, action) => {
      const user = action.payload.user;

      state.orderedUsers[user.uid] = user;
    },

    setUserLoading: (state) => {
      state.isUsersLoading = !state.isUsersLoading;
    },
    resetUsers: (state) => {
      state.users = [];
    },
  },
});
export const { setStoredUsers, setUserLoading, resetUsers, setOrderedUsers } =
  userSlice.actions;
export default userSlice.reducer;
