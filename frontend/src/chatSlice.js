import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";


const getErrorMessage = (error) => {
  if (error.response) {
    return error.response.data?.message || "Server error occurred";
  } else if (error.request) {
    return "No response from server";
  } else {
    return error.message || "An error occurred";
  }
};


// Async thunk

export const sendMessageToAI = createAsyncThunk(
  "chat/send",
  async ({ messages, problem,code}, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post("/chat/ai", {
        title: problem?.title,
        description: problem?.description,
        visibleCases: problem?.visibleCases,
        code: code,
        message: messages, 
      });

      return res.data.message;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);


// Slice

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [
      {
        role: "model",
        parts: [{ text: "Hello! How can I help you today?" }],
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    addUserMessage: (state, action) => {
      state.messages.push({
        role: "user",
        parts: [{ text: action.payload }],
      });
    },
    resetChat: (state) => {
      state.messages = [
        {
          role: "model",
          parts: [{ text: "Hello! How can I help you today?" }],
        },
      ];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessageToAI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessageToAI.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push({
          role: "model",
          parts: [{ text: action.payload }],
        });
      })
      .addCase(sendMessageToAI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "AI failed to respond";
        state.messages.push({
          role: "model",
          parts: [{ text: "Sorry, I ran into an error. Please try again." }],
        });
      });
  },
});

export const { addUserMessage, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
