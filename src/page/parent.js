import { ThemeProvider } from "@emotion/react";
import { AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, CssBaseline, GlobalStyles, Grid, Toolbar, Typography, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import client from "../api/client";
const Parents = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const role = jwtDecode(token);
    // console.log(role);
    const location = useLocation();
    const navigate = useNavigate();
    let date = Math.floor(Date.now()/1000);
    console.log(date);
    console.log(location.state.dateUnix);
    const dateUnix =location.state.dateUnix;
    // let payload = {refreshToken:}
    // const refresh = async () => {
    //   await client.get("/auth/refreshToken").then((res)=>{
    //     cookies.set("cookie",res.data.)
    //   });

    // }
    useEffect(() => {
        if(dateUnix===date){

        }
        if(location.state?.role!==role.roles[0]){
            navigate('/login');
        }
        
    })
    const logout = () => {
      cookies.remove("token");
      navigate("/login");
    }
    // TODO remove, this demo shouldn't need to reset the theme.
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <nav>

          </nav>
          <Button onClick={logout} variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>

    )
}
export default Parents;