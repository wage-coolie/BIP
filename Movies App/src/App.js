import {useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';
// importing navbar
import Navbar from './components/navbar/Navbar'
// Importing card
import Card from './components/card/Card'

function App() {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  useEffect(() => {
    const fecthMovies = async () => { 
      const res = await axios.get('https://movie-task.vercel.app/api/popular?page='+page)
      await setMovies(res.data.data.results)
      let yearsL = [];
      let monthsL = [];
      const gettingYearsAndMonths = res.data.data.results.map((result)=>{
        yearsL = [...yearsL,result.release_date.split('-')[0]]
        monthsL = [...monthsL , result.release_date.split('-')[1]]
      })
      const newPromise = await Promise.all(gettingYearsAndMonths)
      await setYears(["All",...new Set(yearsL)])
      await setMonths(["ALL",...new Set(monthsL)].sort())
      setLoading(false)
    }
    fecthMovies();

      // setYears([...new Set(years)])
      // setMonths([...new Set(months)]) 


    
  }, [])
 
  const sortByYear = (e) => {
    e.preventDefault();
    if (e.target.value == 'All'){
      setFilteredMovies([])
      return;
    }
    // console.log(e.target.value)
    setFilteredMovies(movies.filter(movie => movie.release_date.split('-')[0] == e.target.value))
  }

  const sortByMonth = (e) => {
    e.preventDefault()
    // console.log(e.target.value)

    if (e.target.value == 'ALL'){
      setFilteredMovies([])
      // console.log('dfshj')
      return;
    }
    setFilteredMovies(filteredMovies.filter(movie => movie.release_date.split('-')[1] == e.target.value))

  }


  // getting search term from navbar
  const searchQuery = (query) => {
    console.log(query)
    // e.preventDefault()
    // console.log(e)
    if (query === '' && movies.length > 1){
      setFilteredMovies([])
      alert("You searched for empty String")
      return;
    }

    setFilteredMovies(movies.filter(movie => movie.original_title.toLowerCase() === query.toLowerCase()))
    console.log(filteredMovies)
  }
  // console.log(filteredMovies)

  // fetching page
  const fetchPage = async (num) => {
    // num.preventDefault();
    // console.log(num)
    await setLoading(true)
    await setPage(num)
    const res = await axios.get('https://movie-task.vercel.app/api/popular?page='+num)
    await setMovies(res.data.data.results)
          let yearsL = [];
      let monthsL = [];
    const gettingYearsAndMonths = res.data.data.results.map((result)=>{
        yearsL = [...yearsL,result.release_date.split('-')[0]]
        monthsL = [...monthsL , result.release_date.split('-')[1]]
      })
    const newPromise = await Promise.all(gettingYearsAndMonths)
    await setYears([...new Set(yearsL)])
    await setMonths([...new Set(monthsL)].sort())
    await setLoading(false)
  }

  // console.log(movies)
  
  return (
    <>
        <Navbar passSearchQueryToApp={searchQuery}/>
      <div className="App">
        {loading ? 
          <div className = "row justify-content-center">
            <span className = "fs-1 text-warning">Loading</span>
          </div>  
          :
          <>
          <div className='m-1 '>
            <p className = "fs-4 text-warning border border-5 border-light  ">Done Loading</p>
          </div>
        {/*Pagination*/}
          <div className='row justify-content-around'>
            <button className='col-sm-1 btn-primary' onClick={()=>fetchPage(page-1)} disabled={page==1}>{page==1?"No Page 0" : `page ${page-1}`}</button>
            <button className='col-sm-3 btn-primary' disabled="true">Current Page : {page}</button>
            <button className='col-sm-1 btn-primary' onClick={()=>fetchPage(page+1)}>page {page+1}</button>
          </div>

          <div className='row justify-content-center my-2'>
            <div className='col-sm-12 col-xl-5 col-md-5 justify-content-around d-flex'>
              <button className='col-sm-4 col-xl-3 col-md-2 bg-dark border border-white text-white'>Sort By Release Year</button>
              <select class="form-select border border-3 yearSelect border-warning " onChange={sortByYear} >

              {
                years && years.map((year)=>(
                  <option key={year} value={year} >{year}</option>

                  ))
              }
              </select>
            </div>

            <div className='col-sm-12 col-xl-5 col-md-5 justify-content-around d-flex'>
              <button className='col-sm-4 col-xl-3 col-md-2 bg-dark border border-white text-white'>Sort By Month</button>
              <select class="form-select border border-3 yearSelect border-warning " onChange={sortByMonth} >

              {
                months && months.map((months)=>(
                  <option value={months} key={months} >{months}</option>

                  ))
              }
              </select>
            </div>
          </div>

          <div className = 'container border-1 border-white'>
            <div className="row justify-content-center">
            {filteredMovies.length<1 && <button className='btn btn-warning my-2' disabled='true'>No filtered Result </button>}

           { (filteredMovies.length>0 && <p className='border border-warning text-white'> Filtered</p> && filteredMovies.map((movie)=>(
              <>
              <Card key={movie.id} movie={movie}/>

              </>
            ))   
                )
            }
            {filteredMovies.length<1 && <button className='btn btn-primary fw-bold text-white' disabled='true' >All Movies </button>}
            {filteredMovies.length<1 &&  movies  &&  movies.map((movie)=>(

              <Card key={movie.id} movie={movie}/>
            )
          )}
            
          
          
            </div> 
          <div className='row justify-content-around pb-3 mb-1'>
            <button className='col-sm-1 btn-primary' onClick={()=>fetchPage(page-1)} disabled={page==1}>{page==1?"No Page 0" : `page ${page-1}`}</button>
            <button className='col-sm-3 btn-primary' disabled="true">Current Page : {page}</button>
            <button className='col-sm-1 btn-primary' onClick={()=>fetchPage(page+1)}>page {page+1}</button>
          </div>

          </div>
          </>

        }
      </div>
    </>
  );
}

export default App;
