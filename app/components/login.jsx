'use client'
import React from "react";
import { Box, Typography,Stack, TextField, Button } from "@mui/material";
// import { getAuth , GoogleAuthProvider,signInWithRedirect } from "firebase/auth";

function Login(){    
    return(
        <>
        <Box>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Password" variant="outlined" />
        <Button onClick={()=>{
            
        }}>Login</Button>
        </Box>
        </>
    )
}

export default Login