import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loginAction } from '../services/@redux/userReducer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { api } from '../services/api';
import { useNavigate } from "react-router-dom"
import Typography from '@mui/material/Typography';

export default function Login() {
    const [user, setUser] = useState({ name: "", email: "" })
    const [errorMsg, setErrorMsg] = useState("")
    const navigator = useNavigate()
    const dispatch = useDispatch()
    
    const persistAndNavigate = (data: any) => {
        const {name, token, uid, email} = data
        dispatch(loginAction({name, token, uid, email}))
        localStorage.setItem("userData", JSON.stringify({name, token, uid, email}))
        api.setToken(token)
        navigator("/home")
    }

    const updateInfo = async (action: string) => {
        if (action === 'login') {
            return await api.Login(user.email).then(
                (data) => {
                    if (!data.email) return setErrorMsg(data)
                    return persistAndNavigate(data)
            }
            )
        }
        return await api.SignUp(user.name, user.email).then(
            (data: any) => {
                if(!data.email) return setErrorMsg(data)
                return persistAndNavigate(data)
            })
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                {["name", "email"].map((item: string) => (
                    <TextField
                        key={item}
                        error
                        id="outlined-error-helper-text"
                        label={item.toUpperCase()}
                        placeholder={'Please enter ' + item}
                        helperText="Incorrect entry."
                        onChange={(e) => setUser(prev => ({ ...prev, [item]: e.target.value }))}
                    />
                ))}
            </div>
            <Button variant="outlined" onClick={() => updateInfo("login")}>
                Login
            </Button>
            <Button variant="outlined" onClick={() => updateInfo("signup")}>
                SignUp
            </Button>
            <Typography sx={{ mb: 1.5 }} color="red">
                {errorMsg}
            </Typography>
        </Box>
    );
}
