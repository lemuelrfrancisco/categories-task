import React from "react";
import classnames from "classnames/bind";

import styles from "./Tasks.module.scss";
import { Tasks } from "../../types/tasks";
import { Status } from "../../types/status";

const cn = classnames.bind(styles);
interface TasksItemProps {
  task: Tasks;
  status: Status | undefined;
  className?: string;
}
const TasksItem = (props: TasksItemProps) => {
  return (
    <div className={cn("task", props.className)}>
      <div className={cn(["status", props.status?.status])}></div>
      {props.task.name}
    </div>
  );
};

export default TasksItem;
