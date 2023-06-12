import  { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'
import axios from 'axios'
import { setUser } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'


const PrivateRoutes = ({children}) => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {user}=useSelector(state=>state.auth)

  const getUser=async()=>{
    try {
        dispatch(showLoading())
        const {data}=await axios.post('/api/v1/user/getUser',{
            token:localStorage.getItem('token')},
            {
                headers:{
                    Authorization:`Bearer ${localStorage.getItem('token')} `
                }
            })
            dispatch(hideLoading())

            if(data.success){
                dispatch(setUser(data.data))
            }else{
                localStorage.clear()
                navigate('/login')
            }
    } catch (error) {
        localStorage.clear()
        dispatch(hideLoading())
        console.log(error)
    }
  }

  
  useEffect(()=>{
    
    if(!user){
        getUser()
    }

    // eslint-disable-next-line
  },[])

if(localStorage.getItem('token')){
    return children
}else{
    return navigate('/login')
}
}

export default PrivateRoutes