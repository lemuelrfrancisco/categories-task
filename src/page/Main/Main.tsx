import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classnames from "classnames/bind";

import styles from "./Main.module.scss";
import {
  fetchstatuses,
  fetchTasks,
  overrideStatus,
} from "../../state/reducer/dataReducer";
import { RootState } from "../../state/store";
import { Tasks } from "../../types/tasks";
import { Status } from "../../types/status";
import TasksItem from "../../components/Tasks";

const cn = classnames.bind(styles);

const Main = () => {
  const datas = useSelector((state: RootState) => state.datas);

  const [htmlState, setHtmlState] = useState<Tasks[]>([]);
  const [cssState, setCssState] = useState<Tasks[]>([]);
  const [jsState, setJsState] = useState<Tasks[]>([]);

  const [statusState, setStatusState] = useState<Status[]>([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchstatuses());
  }, []);

  useEffect(() => {
    setHtmlState(datas.html || []);
    setCssState(datas.css || []);
    setJsState(datas.js || []);
  }, [datas.html, datas.css, datas.js]);

  useEffect(() => {
    setStatusState(datas.statuses || []);
  }, [datas.statuses]);

  const overrideStatusHandler = () => {
    dispatch(overrideStatus());
  };
  return (
    <div className={cn("main")}>
      <h1>Categories and Tasks</h1>
      <div className={cn("container", "override-container")}>
        <button onClick={overrideStatusHandler}>Override Status</button>
      </div>
      <div className={cn("container")}>
        <div className={cn("task-container")}>
          <h3>HTML</h3>
          {htmlState.map((task: Tasks) => (
            <TasksItem
              key={task.id}
              task={task}
              status={statusState.find((s) => s.taskId === task.id)}
            />
          ))}
        </div>

        <div className={cn("task-container")}>
          <h3>CSS</h3>
          {cssState.map((task: Tasks) => (
            <TasksItem
              key={task.id}
              task={task}
              status={statusState.find((s) => s.taskId === task.id)}
            />
          ))}
        </div>

        <div className={cn("task-container")}>
          <h3>JS</h3>
          {jsState.map((task: Tasks) => (
            <TasksItem
              key={task.id}
              task={task}
              status={statusState.find((s) => s.taskId === task.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
