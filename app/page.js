"use client";
import React from "react";
import { useState } from "react";
import {Box,Stack,Button} from "@mui/material";
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";
import Homepage from "./components/homepage";
import Loginpage from "./components/login";
import Registerpage from "./components/signup";

export default function Home() {
  const [openLogin, setOpenLogin] = useState('none');
  const [openRegister, setOpenRegister] = useState('none');

  return (
    <Stack
      width="100vw"
      height="100vh"
      display={"flex"}
      alignItems={"center"}
      gap={2}
    >
      {/* Header */}
      <Header />

      {/* Login / Register */}
      <Box>
        <Button
        onClick={()=>{
          setOpenRegister('none')
          if(openLogin=='none')
            setOpenLogin('block')
          else setOpenLogin('none')
        }}
        >Login</Button>
        <Button
        onClick={()=>{
          setOpenLogin('none')
          if(openRegister=='none')
            setOpenRegister('block')
          else setOpenRegister('none')
        }}
        >Register</Button>
      </Box>

      {/* Login */}
      <Box display={openLogin}><Loginpage/></Box>

      {/* Register */}
      <Box display={openRegister}><Registerpage/></Box>

      {/* After Login */}
      <Homepage/>

      {/* Footer */}
      <Footer />
        {/* </ClerkProvider> */}
    </Stack>
  );
}
