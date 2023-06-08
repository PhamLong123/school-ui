import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Student = () => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const location = useLocation();
    const navigate = useNavigate();
    const stateLogin = location.state?.token;
    console.log(stateLogin);
    useEffect(() => {
        if(token!==stateLogin||stateLogin===null||stateLogin===undefined){
            navigate('/login');
        }
        
    })
    return (
        <div>
            Student
        </div>
    )
}
export default Student;