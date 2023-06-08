import { AppBar, Button, CssBaseline, GlobalStyles, ThemeProvider, Toolbar, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import client from "../api/client";

const Student = () => {
    const cookies = new Cookies();
    const location = useLocation();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("date");
        localStorage.removeItem("refreshToken");
        cookies.remove("token");
        navigate("/login");
    }
    let payload = {
        refreshToken: localStorage.getItem('refreshToken')
    }

    let date = Math.floor(Date.now() / 1000);


    useEffect(() => {
        if (payload.refreshToken == null){
            logout();
        }
        
        if (localStorage.getItem("date") <= date) {
            refresh(payload).catch(()=>{
                logout();
            });
        }else{
            checkRole().catch(()=>{
                logout();
            });
        }
    })

    const checkRole = async () => {
        try {
            let token = await cookies.get("token");
            const role = jwtDecode(token);
            if (location.state?.role !== role.roles[0]) {
                logout();
            }
        }
        catch (err) {
            refresh(payload).catch(()=>{
                logout();
            });
        }
    }
    
    const refresh = async (payload) => {
        await client.post("/auth/refreshtoken", payload).then((res) => {
            cookies.set("token", res.data.token);
        });
    }
    // console.log(location.state?.dateUnix);

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
            <div>
        Student
      </div>
        </ThemeProvider>

    )
}
export default Student;