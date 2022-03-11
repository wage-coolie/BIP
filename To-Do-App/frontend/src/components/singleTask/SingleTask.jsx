

import {React,useState} from 'react'
import axios from 'axios'
import './singletask.css'

export default function SingleTask({task}) {
	const [newDescription, setNewDescription] = useState(task.description)
	const [status, setStatus] = useState(task.status)
	const [fetching, setFetching] = useState(false)
	const editTask = async (e) => {
		e.preventDefault();
		setFetching(true)
		const newTask = {
			description:newDescription,
			status:status
		}
		try{
		     const res = await axios.put('/api/tasks/'+task._id,newTask)
		     await setFetching(false)
     		window.location.reload()

		    }catch(e){
		     console.log(e);
		     setFetching(false)
		     alert("Task not Added");
		    }
	}

	const deleteTask = async (e) => {
			e.preventDefault();
			setFetching(true)
			try{
			const res = await axios.delete('/api/tasks/'+task._id)
		    await setFetching(false)

			     window.location.reload()
			     


				// mousedown
		}catch(e){
			console.log(e);
			setFetching(false)
			alert("message not Deleted");
		}
	}

	// console.log(task)

	return (
		<>
		<div className='col-xl-8 col-md-10 col-sm-12 text-white border border-2 border-primary my-2 text-white d-flex'>
			<span class="" className={task.status?"bg-success border-success  status text-white border border-5  px-3 my-1":"border-danger bg-danger  status text-white border border-5  px-3 my-1"} > {task.status ? "Completed" : "Not Completed"} </span>
			<p className='ms-2 my-2 p-1 border border-1 border-warning'>{task.description}</p>
		</div>
		<div className="col-xl-2 col-md-2 col-sm-4 text-center my-2">
			<button className="btn-warning" data-bs-toggle="modal" data-bs-target={`#edit${task._id}`}>Edit</button>
			<button className="btn-danger mx-2" onClick={deleteTask} disabled={fetching} >Delete</button>
		</div>

	{/*The Modal To Edit the Message*/}
		<div className="modal fade" id={`edit${task._id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div className="modal-dialog bg-warning border border-4 border-white">
		    <div className="modal-content bg-warning">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
		        <button type="button" className="btn-close btn-danger text-white" id='edited' onClick={()=> console.log("sdfuh") } data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div className="modal-body">
		      <label>Type New description</label>
		      	<input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} />
		      </div>
		      <div class="form-check justify-content-center">
				  <label class="form-check-label" for="flexCheckDefault">
				  <input class="form-check-input" type="checkbox" checked={status}  onChange={()=>setStatus(!status)} value="status" id="flexCheckDefault"/>
				    Have you Completed The task?
				  </label>
				</div>
		      <div className="modal-footer">
		        <button type="button" className="btn btn-success " disabled={fetching} onClick={editTask} >Save changes</button>
		      </div>
		    </div>
		  </div>
		</div>

		</>
	)
}