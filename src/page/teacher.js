import { ThemeProvider } from "@emotion/react";
import { AppBar, Button, CssBaseline, GlobalStyles, Toolbar, createTheme } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import client from "../api/client";

const Teacher = () => {
    let payload = {
        refreshToken: localStorage.getItem('refreshToken')
    }
    const cookies = new Cookies();
    const refresh = async (payload) => {
        await client.post("/auth/refreshtoken", payload).then((res) => {
            cookies.set("cookie", res.data.token);
        });
    }
    let date = Math.floor(Date.now() / 1000);
    if (localStorage.getItem("date") <= date) {
        refresh(payload);
    }
    const location = useLocation();
    const navigate = useNavigate();
    const checkRole = async () => {
        try {
            let token = await cookies.get("token");
            const role = jwtDecode(token);
            if (location.state?.role !== role.roles[0]) {
                logout();
            }
        }
        catch (err) {
            refresh(payload);
        }
    }
    useEffect(() => {
        checkRole();
    })

    console.log(location.state?.dateUnix);


    const logout = () => {
        localStorage.removeItem("date");
        localStorage.removeItem("refreshToken");
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
export default Teacher;