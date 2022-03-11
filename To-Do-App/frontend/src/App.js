
import {useState,useEffect} from 'react';
import './App.css';
// Import Axios
import axios from 'axios'

import AddTask from "./components/addTask/AddTask"
import SingleTask from "./components/singleTask/SingleTask"


function App() {
  const [fetching, setFetching] = useState(true)
  const [tasks, setTasks] = useState([])
  const [filteredResult, setFilteredResult] = useState([])

  useEffect(() => {
    const fetchAllTasks = async () => {
      const res = await axios.get('api/tasks/all')
      await setTasks(res.data)
      await setFetching(false)
    }

    fetchAllTasks();
  }, [])

  const sendTaskToAPP = async({task}) => {
    // console.log(task)
  try{
     const res = await axios.post('/api/tasks',task)
     // await alert("Done")
     window.location.reload()
    }catch(e){
     console.log(e);
     alert("Task not Added");
    }
  }


  const changeFilter = (e) => {
    // console.log(e.target.value)
    if (e.target.value === "All"){
      setFilteredResult([])
    }else if (e.target.value === "Completed"){
      setFilteredResult(tasks.filter((task)=> task.status === true))
    }else {
      setFilteredResult(tasks.filter((task)=>task.status === false))
    }

  }


// console.log(tasks)

  return (
<div className="App bg-dark">
      <div className="container mx-auto border border-white border-3">
        <div className="row m-2">
          <AddTask taskToApp={sendTaskToAPP} />
        </div>
        <hr/>
        <div className="row m-2 text-center ">
          {fetching === true ? <h2 className='text-white mt-2 border border-2 border-warning'>
            Loading...
          </h2>
          :
          <h2 className='text-white mt-2 border border-2 border-warning'>{tasks.length} Tasks</h2>
          }
        </div>
        <div className='row justify-content-center border border-white my-1 py-2' onChange={changeFilter}>
          <div class="form-check col-xl-3">
            <input class="form-check-input mx-auto" type="radio" value ="All"name="flexRadioDefault"/>
            <label class="form-check-label text-white" for="flexRadioDefault1">
              Show ALL
            </label>
          </div>
          <div class="form-check col-xl-3">
            <input class="form-check-input mx-auto" type="radio" name="flexRadioDefault" value ="Completed"/>
            <label class="form-check-label text-white" for="flexRadioDefault2">
              Show Completed
            </label>
          </div>
          <div class="form-check col-xl-3">
            <input class="form-check-input mx-auto" type="radio"  name="flexRadioDefault" value ="Uncomplete"/>
            <label class="form-check-label text-white" for="flexRadioDefault2">
              Show Uncomplete Task
            </label>
          </div>

        </div>



        <div className='row m2 text-center mx-auto justify-content-center'>
          {(tasks.length === 0) ?
            <p>EMPTY</p> 
            :
            <>
            {filteredResult && filteredResult.map((task)=>(
               <SingleTask key={task._id} task={task}/>

              ))}

            {tasks && filteredResult.length == 0 && tasks.map((task)=>(
               <SingleTask key={task._id} task={task}/>

              ))}


            </>  
            }
          
        </div>
      </div>
      </div>
  );
}

export default App;
