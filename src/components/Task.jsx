import React, { useState } from 'react'
import { ReactComponent as CloseLogo } from '../svg/close.svg'


const Task = ({task, updateTask, deleteTask, activateTask}) => {

  const [ taskSubject, setTaskSubject ] = useState(task.subject)

  const handleChangeSubject = (e) => {
    setTaskSubject(e.target.value)
    task.subject = e.target.value
    updateTask(task)
  }

  const handleClickDel = (e) => {
    e.stopPropagation();
    deleteTask(task)
  }

  const handleChangeStatus = () => {
    activateTask(task)
  }

  return (
    <div className="task-box" onClick={handleChangeStatus}>
      <div className={task.isActive ? "task-status active" : "task-status"}></div>
      <div className="task-subject">
        <input type="text" value={taskSubject} onChange={(e) => handleChangeSubject(e)} />
      </div>
      <div className="task-runs">{task.runs}/{task.rounds}</div>
      <div className="task-del" onClick={(e) => handleClickDel(e)}>
        <CloseLogo />
      </div>
      
    </div>
  )
}

export default Task