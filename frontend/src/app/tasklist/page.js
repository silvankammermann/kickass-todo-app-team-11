"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import TaskRow from "@/app/components/TaskRow/TaskRow";
import Popover from "@/app/components/Popover/Popover";
import AddTask from "@/app/components/Tasks/AddTask";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import React, { useState, useEffect } from "react";
import TaskCreate from "@/app/components/TaskCreate/TaskCreate";
import defaultTasks from "@/app/testdata/tasks.js";
import { getBgClass } from "@/app/utils";

export default function Tinder() {
  const [tasks, setTasks] = useState([]);

  // TODO: might need refactoring -> maybe move to
  const fetchTaskData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/gettasks`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setTasks(defaultTasks);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  return (
    <>
      <Popover
        trigger={
          <div className={styles.addTaskIcon}>
            <AddCircleRoundedIcon className={styles.icon__add} />
          </div>
        }
      >
        <TaskCreate />
      </Popover>

      {tasks && tasks.length > 0 ? (
        tasks.map((task) => <TaskRow key={task.id} bgPatternClass={getBgClass(task)} taskName={task.name} />)
      ) : (
        <div className={`h1 ${styles.msgLoading}`}>loading...</div>
      )}

      <Link href="/">
        <Image
          className={styles.kickassButton}
          width={400}
          height={400}
          src={`/images/kickass-button.png`}
          alt="Button"
          style={{
            width: "10em",
            height: "auto",
            maxWidth: "100%",
          }}
        />
      </Link>
    </>
  );
}
