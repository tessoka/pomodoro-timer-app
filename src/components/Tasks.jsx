import React, { useEffect, useContext } from 'react'
import Task from './Task'
import { SettingsContext, TaskListContext } from '../utilities/Context'

const Tasks = () => {
  
  const { currentSettings } = useContext(SettingsContext)
  let { taskList, setTaskList } = useContext(TaskListContext)

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
    taskList.push({id: id, isActive: active, subject: "New Task", runs: 0, rounds: currentSettings.rounds})
    setTaskList([...taskList])
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
  }

  const updateTask = (task) => {
    setTaskList([...taskList])
    localStorage.setItem("taskList", JSON.stringify([...taskList]))
  }

  const deleteTask = (task) => {
    taskList = taskList.filter(taskObj => taskObj !== task)
    console.log("del was kicked off")
    updateTask()
  }

  const activateTask = (task) => {
    if (taskList.length > 1) taskList.forEach(taskObj => taskObj.isActive = false)
    task.isActive = true
    console.log("activate was kicked off")
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
        <p>Tasks</p>
      </div>
      <div className="task-list">
        { taskList.map(task => <Task key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} activateTask ={activateTask} />) }
      </div>

      <button className="btn" onClick={handleClickAdd}>Add Task</button>

    </div>
  )
}

export default Tasks