'use client'
import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function Loginpage(){

    const [email, setEmail]=useState("");
    const [password, setPassword]= useState("");
    
    return(
        <>
        <Box display={"flex"} flexDirection={"column"} gap={1.5}>
            <TextField id="outlined-basic" required label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <TextField id="outlined-basic" required label="Password" variant="outlined" value={password} onChange={(e)=>{ setPassword(e.target.value)}} />
            <Button variant="contained">Login</Button>
            <Button variant="contained">Login with google</Button>
        </Box>
        </>
    )
}

export default Loginpage