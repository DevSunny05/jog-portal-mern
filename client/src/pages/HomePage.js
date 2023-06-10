import React from 'react'
import '../styles/HomePage.css'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
        <video autoPlay muted loop id='myVideo'>
            <source src='/assets/videos/bg.mp4' type='video/mp4'/>
        </video>

        <div className='content'>
            <div className="card w-25">
                <h1 style={{margin:'20px auto 2px',fontWeight:'bold',fontFamily:'sans-serif',letterSpacing:'2px'}}>JOB PORTAL</h1>
            

            <div className="card-body">
                <h5 className='card-title' style={{color:'blue',fontSize:'25px',fontWeight:'normal',marginBottom:'10px'}}>Indias No #1 carrier platform</h5>
                <p className='card-text' style={{color:'gray',fontSize:'18px'}} >
                    Search and Manage your jobs with ease, free and open source job portal application...
                </p>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:'15px'}}>
                    <p style={{fontSize:'18px',color:'black',fontWeight:'500'}}>
                        Not a user? Register <Link to='/register'>Here!</Link>
                    </p>
                    <p>
                        <Link to='/login' className='btn'>Login</Link>
                    </p>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default HomePage