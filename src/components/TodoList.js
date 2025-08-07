import React, { useRef, useState } from 'react'

function TodoList() {

  let inputRef = useRef();
  let [taskList, setTaskList] = useState([]);

  let addTask = () => {
    if (inputRef.current.value.trim()) {
      let newTask = {
        task: inputRef.current.value,
        createdAt: new Date().toLocaleString('en-IN', { hour12: true }),
        isCompleted: false
      }
      setTaskList([...taskList, newTask])
      inputRef.current.value = ''
    }
  }
  let editTask = (ele, ind) => {
    console.log('the ele and ind :', ele, ind)
    let newTask = prompt('Edit task :', ele.task)
    taskList[ind].task = newTask;
    setTaskList([...taskList])
    console.log('the edited tasklist is :', taskList)
  }

  let deleteTask = (ind) => {
    console.log('the task list before the deletion is  :', taskList)
    taskList.splice(ind,1)
    console.log('the tasklist after the deletion is :', taskList)
    setTaskList([...taskList])
  }
  return (
    <div className='main-container'>
      <h1><u>Todo List</u></h1>
      <div className='add-task-container'>
        <label>Add Task</label>
        <div>
          <input ref={inputRef} type='text'></input>
          <button type='button' onClick={() => {
            addTask();
          }}>Add</button>
        </div>
      </div>

      {taskList.map((ele, ind) => {
        return <div key={ind} className='taskList-container'>
          <div className='task-and-buttons'>
            <span>{ele.task}</span>
            <button type='button' onClick={() => {
              editTask(ele, ind);
            }} style={{ color: 'green' }}>Edit</button>
            <button type='button' onClick={() => {
              deleteTask(ind);
            }} style={{ color: 'red' }}>Delete</button>
          </div>

          <div className='creation-and-status'>
            <span>Created at: {ele.createdAt}</span>
            <input type='checkbox' onChange={(eo) => {
              let newStatus = eo.target.checked;
              let updatedTaskWithStatus = [...taskList]
              updatedTaskWithStatus[ind].isCompleted = newStatus
              setTaskList(updatedTaskWithStatus)
            }}></input>
            <p>{ele.isCompleted ? 'Completed' : 'Pending'}</p>
          </div>
        </div>
      })}


    </div>
  )
}

export default TodoList