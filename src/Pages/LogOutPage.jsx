import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function LogOutPage (){
    const navigate = useNavigate()
    axios
    .get('http://mykyta-matvieiev.com:3001/logout', {
      withCredentials: true,
    })
    .then(()=>{
      
      navigate('/')
    })
    
}
