import React from 'react'
import axios from 'axios'
import {useRef} from "react"


export default function AddTask(props) {
	const taskDescription = useRef();
	const submitTask = async (e) => {
		e.preventDefault();
		const task = {
			description:taskDescription.current.value
		}
		props.taskToApp({task})

	}

	return (
		<>
		<div className='col-xl-8 col-md-8 col-sm-12 align-middle'>
			<div class="input-group input-group-lg">
			  <span class="input-group-text" id="inputGroup-sizing-lg">Task</span>
			  <input type="text" class="form-control" ref={taskDescription} aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"/>
			</div>		
		</div>
		<div className="col-xl-2 col-md-2 col-sm-4">
			<button className='btn btn-primary mt-1' onClick={submitTask} > Add Task </button>
		</div>
		{/*<button className="btn-white" onClick={props.printe} >+</button>*/}
		</>
	)
}