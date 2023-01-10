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

  const [tasksState, setTasksState] = useState<Tasks[]>([]);
  const [statusState, setStatusState] = useState<Status[]>([]);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchstatuses());
  }, []);

  useEffect(() => {
    setTasksState(datas.tasks || []);
  }, [datas.tasks]);

  useEffect(() => {
    setStatusState(datas.statuses || []);
  }, [datas.statuses]);

  const displayList = (category: string) => {
    return tasksState.filter((t) => t.category === category);
  };

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
          {displayList("html").map((task: Tasks) => (
            <TasksItem
              key={task.id}
              task={task}
              status={statusState.find((s) => s.taskId === task.id)}
            />
          ))}
        </div>

        <div className={cn("task-container")}>
          <h3>CSS</h3>
          {displayList("css").map((task: Tasks) => (
            <TasksItem
              key={task.id}
              task={task}
              status={statusState.find((s) => s.taskId === task.id)}
            />
          ))}
        </div>

        <div className={cn("task-container")}>
          <h3>JS</h3>
          {displayList("js").map((task: Tasks) => (
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
