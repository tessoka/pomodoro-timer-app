import React, { useState, useEffect } from 'react'
import Task from './Task'

const Tasks = () => {

  let [taskList, setTaskList] = useState([])

  const handleClickAdd = () => {
    let id = 0
    let active = true
    if (taskList.length === 0) {
      id = 1
      active = true
    }  else {
      id = taskList[taskList.length-1].id+1
      active = false
    }
    taskList.push({id: id, isActive: active, subject: "", runs: 0})
    setTaskList([...taskList])
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
  }

  const updateTask = (task) => {
    setTaskList([...taskList])
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
  }

  const deleteTask = (task) => {
    taskList = taskList.filter(taskObj => taskObj !== task)
    updateTask()
  }


  useEffect(() => {
    if (localStorage.getItem("taskList") !== null) {
      setTaskList(JSON.parse(localStorage.getItem("taskList")))
    }
  }, [])

  useEffect(() => {
    console.log(taskList)
  }, [taskList])


  return (
    <div className="tasks-box">

      <div className="tasks-header">
        Tasks
      </div>
      <div className="task-list">
        { taskList.map(task => <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />) }
      </div>

      <button className="btn" onClick={handleClickAdd}>Add Task</button>

    </div>
  )
}

export default Tasks