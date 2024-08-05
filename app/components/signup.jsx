import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function Registerpage(){


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
        <>
        <Box display={"flex"} flexDirection={"column"} gap={1.5}>
            <TextField id="outlined-basic" required  label="Username" variant="outlined"/>
            <TextField id="outlined-basic" required  label="Email" variant="outlined" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
            <TextField id="outlined-basic" required  label="Password" variant="outlined" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            {/* <TextField id="outlined-basic" required  label="Password" variant="outlined" value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}}/> */}
            <Button variant="contained">Register</Button>
        </Box>
        </>
    )
}

export default Registerpage