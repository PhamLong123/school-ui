import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Success = () =>{
    const location = useLocation();
    const navigate = useNavigate();
    // const { login } = useContext(AuthContext);
    useEffect(()=>{
        const cookies = new Cookies();
        const token = cookies.get('token');

        if(check()){
            if(location.state?.jwtDecode?.roles[0]==='STUDENT'){
                    navigate('/student',{state:{token:token,role:location.state?.jwtDecode?.roles[0]}})
            }
            if(location.state?.jwtDecode?.roles[0]==='TEACHER'){
                    navigate('/teacher',{state:{token:token,role:location.state?.jwtDecode?.roles[0]}})
            }
            if(location.state?.jwtDecode?.roles[0]==='PARENTS'){
                    navigate('/parents',{state:{token:token,role:location.state?.jwtDecode?.roles[0]}})
            }
        }
        else{
            <div>fail</div>
            navigate('/login');
        }
    });
    const check = async () => {
        const cookies = new Cookies();
        const token = await cookies.get('token');
        console.log(location.state?.token);
        console.log(token);
        if(token !== location.state?.token || token === null||  token === undefined) {
            return false;
        }else{
            return true;
        }
        
    }

}
export default Success;