

import{ React,useState} from 'react'
import './navbar.css'

export default function Navbar({passSearchQueryToApp}) {

  const [searchQ, setSearchQ] = useState('')
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark  border-bottom border-5 border-light">
  <div className="container-fluid">
    <a className="navbar-brand text-light" href="#">BIP MOVIES</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon p-3 border border-warning border-5"></span>
    </button>
    <div className="collapse navbar-collapse  justify-content-center" id="navbarSupportedContent">
      <div className="d-flex"  >
        <input className=" me-2 border-4 border-warning" type="search" placeholder="Search" onChange={(e)=>setSearchQ(e.target.value)} aria-label="Search"/>
        <button className="btn btn-outline-success bg-warning " onClick={()=>passSearchQueryToApp(searchQ)}><span className=' fs-5'>Search</span></button>
      </div> 
    </div>
  </div>
</nav>
    </div>
  )
}