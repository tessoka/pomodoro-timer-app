import React, { useState } from 'react'


const Task = ({task, updateTask, deleteTask}) => {

  const [ taskSubject, setTaskSubject ] = useState(task.subject)

  const handleChangeSubject = (e) => {
    setTaskSubject(e.target.value)
    task.subject = e.target.value
    updateTask(task)
  }

  const handleClickDel = () => {
    deleteTask(task)
  }

  return (
    <div className="task-box">
      <div className={task.isActive ? "task-status active" : "task-status"}></div>
      <div className="task-subject">
        <input type="text" value={taskSubject} onChange={(e) => handleChangeSubject(e)} />
      </div>
      <div className="task-runs">{task.runs}</div>
      <div className="task-del" onClick={handleClickDel}>
        <svg className="icon icon-close" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"/></svg>
      </div>
      
    </div>
  )
}

export default Task