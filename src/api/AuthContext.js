import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import client from "./client.js";
import jwtDecode from "jwt-decode";
// axios.defaults.headers.common['Authorization'] = cookies.get('token');

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [getLogin, setgetLogin] = useState({ isAuthenticated: false });
  const navigate = useNavigate();
  const login = async (payload) => {
    await client.post("/auth/login", payload).then((res) => {
      // const data =  client.post("/auth/user");
      const newCookie = new Cookies();
      // console.log(res.data.roles[0]);
      setgetLogin({ isAuthenticated: true });
      const token = res.data.token;
      var role = res.data.roles[0];
      // console.log(role); 
      let date = new Date(jwtDecode(token).exp*1000);
      // console.log(date);
      const dateUnix = jwtDecode(token).exp;
      localStorage.setItem('refreshToken',res.data.refreshToken);
      localStorage.setItem('date',dateUnix);
      navigate("/"+role.toLowerCase(), { state: {role,date,dateUnix}});
      newCookie.set("token", token, {path: "/",expires:date});
    });

  };
  return (
    <>
      {/* {" "} */}
      <AuthContext.Provider value={{ getLogin, login }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
