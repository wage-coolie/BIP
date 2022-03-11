import {React,useState, useEffect } from 'react'
import './card.css'

export default function Card({movie}) {
	const [loading, setLoading] = useState(true)
	return (
		<>
		<div className="col-xl-3 col-md-3 col-sm-6 card m-2 border border-warning" >
		  	<img src={"https://image.tmdb.org/t/p/original"+movie.poster_path} class="card-img-top img-fluid mt-2 border border-warning" alt="..."/>
		  	<div class="card-body">
		    	<h5 class="card-title fw-bold">{movie.original_title}</h5>
		    	<p class="card-text" >{movie.overview.substring(0,150)}...</p>
		    	<button className='btn btn-info  align-items-center' data-bs-toggle="modal" data-bs-target={"#exampleModal"+movie.id}>Show More Info</button>
			</div>
		</div>

	{/*Model*/}
	<div id={"exampleModal"+movie.id} className="modal fade" tabIndex="-1" >
        <div className="modal-dialog modal-fullscreen  modal-fullscreen-sm-down modal-fullscreen-md-down .modal-fullscreen-lg-down .modal-fullscreen-xl-down modal-fullscreen-xxl-down m-1 pt-2 bg-dark p-5" > 
            <div className="modal-header justify-content-center">
				<h6 className="modal-title text-light">{movie.original_title}</h6>
                <button type="button" className="btn-close btn-outline-danger border border-white border-3 bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> 
            <div className='modal-body bg-dark'>
            <div className='container col-xl-10 col-md-10 col-sm-10 '>	
    			<div className='row justify-content-center'>
    				<div className='d-flex justify-content-center'>
    					<img src={"https://image.tmdb.org/t/p/original"+movie.backdrop_path} className=" img-fluid mt-2 border border-warning col-xl-9 modal_image" alt="..."/>	
    				</div>
    				<div className='d-flex justify-content-center text-white mt-4'>
    					<div className='col-xl-2 col-md-3 col-sm-9 fw-bold'>
    						Overview :
    					</div>
    					<div className='col-xl-9 col-md-8 col-sm-9'>
    						{movie.overview}
    					</div>	
    				</div>
    				<div className='d-flex justify-content-center text-white mt-4'>
    					<div className='col-xl-3 col-md-4 col-sm-6'>
    						<span className='fw-bold'>Language : </span>{movie.original_language}
    					</div>
    					<div className='col-xl-3 col-md-4 col-sm-6'>
    						<span className='fw-bold'>Released : </span>{movie.release_date}
    					</div>
						<div className='col-xl-3 col-md-4 col-sm-6'>
    						<span className='fw-bold'>Ratings : </span>{movie.vote_average}
    					</div>
						<div className='col-xl-3 col-md-4 col-sm-6'>
    						<span className='fw-bold'>Total Votes : </span>{movie.vote_count}
    					</div>

    				</div>
    			</div>
    		</div>
    		</div>
    	</div>
   	</div>







		</>
	)
}