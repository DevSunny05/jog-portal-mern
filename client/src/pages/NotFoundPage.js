import React from 'react'
import {Link} from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
        <h1>NotFoundPage</h1>
        <Link className='btn btn-success' to='/'>Go Back</Link>
    </>
    
  )
}

export default NotFoundPage