import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http/httpClient";
import { cloneDeep } from "lodash";
import { Tasks } from "../../types/tasks";
import { Status } from "../../types/status";

export const fetchTasks = createAsyncThunk("data/fetchTasks", async () => {
  const response = await httpClient.get<Tasks[]>("tasks", {});
  const datas = {
    raw: response.data,
    html: response.data.filter((t) => t.category === "html"),
    css: response.data.filter((t) => t.category === "css"),
    js: response.data.filter((t) => t.category === "js"),
  };
  return datas;
});

export const fetchstatuses = createAsyncThunk(
  "data/fetchstatuses",
  async () => {
    const response = await httpClient.get<Status[]>("statuses", {});
    return response.data;
  }
);
interface DataState {
  requestStatus: string;
  tasks?: Tasks[];
  statuses?: Status[];
  html?: Tasks[];
  css?: Tasks[];
  js?: Tasks[];
}
const initialState: DataState = {
  requestStatus: "idle",
  tasks: undefined,
  statuses: undefined,
  html: undefined,
  css: undefined,
  js: undefined,
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
      // state.tasks = action.payload.raw;
      state.html = action.payload.html;
      state.css = action.payload.css;
      state.js = action.payload.js;

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
