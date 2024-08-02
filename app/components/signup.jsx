import React from "react";
import { Box, Typography,Stack, TextField, Button } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



function Login(){

    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth,email,password)
    //     .then((userCredential.user)=>{
    //         const user = userCredential.user;
    //     })
    
    return(
        <>
        <Box>
            <TextField id="outlined-basic" label="Username" variant="outlined" />
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            <TextField id="outlined-basic" label="Password" variant="outlined" />
            <Button>Register</Button>
        </Box>
        </>
    )
}

export default Login