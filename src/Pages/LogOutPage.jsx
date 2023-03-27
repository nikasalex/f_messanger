import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export function LogOutPage (){
    const navigate = useNavigate()
    axios
    .get('http://localhost:3001/logout', {
      withCredentials: true,
    })
    .then(()=>{
      
      navigate('/')
    })
    
}
