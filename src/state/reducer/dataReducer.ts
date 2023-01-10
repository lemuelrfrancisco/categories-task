import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http/httpClient";
import { cloneDeep } from "lodash";
import { Tasks } from "../../types/tasks";
import { Status } from "../../types/status";

export const fetchTasks = createAsyncThunk("data/fetchTasks", async () => {
  const response = await httpClient.get("tasks", {});
  return response.data;
});

export const fetchstatuses = createAsyncThunk(
  "data/fetchstatuses",
  async () => {
    const response = await httpClient.get("statuses", {});
    return response.data;
  }
);
interface DataState {
  requestStatus: string;
  tasks?: Tasks[];
  statuses?: Status[];
}
const initialState: DataState = {
  requestStatus: "idle",
  tasks: undefined,
  statuses: undefined,
};
const dataSlice = createSlice({
  name: "datas",
  initialState,
  reducers: {
    overrideStatus: (state) => {
      const statuses = cloneDeep(state.statuses);
      if (statuses !== undefined) {
        statuses.map((status) => {
          status.status = "override";
          return status;
        });
        state.statuses = statuses;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.rejected, (state) => {
      state.requestStatus = "rejected";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.requestStatus = "success";
    });
    builder.addCase(fetchstatuses.rejected, (state) => {
      state.requestStatus = "rejected";
    });
    builder.addCase(fetchstatuses.fulfilled, (state, action) => {
      state.statuses = action.payload;
      state.requestStatus = "success";
    });
  },
});
export const { overrideStatus } = dataSlice.actions;

export default dataSlice.reducer;
