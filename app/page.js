"use client";
import { useState, useEffect } from "react";
import {Box,Stack,Button, Typography} from "@mui/material";
import "./globals.css";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import Inventory from "./components/inventory";

export default function Home() {

  const [open, setOpen] = useState('none');
  const handleOpen = () => setOpen('block');
  const handleClose = () => setOpen('none');

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

      {/* Navigation */}
      <Box
        display={"flex"}
        gap={2}
      >
        <Button variant="contained"
          onClick={()=>{
          handleClose()
          }}>Home</Button>
        <Button variant="contained"
          onClick={()=>{
          handleOpen()
          }}>Inventory</Button>
      </Box>

      {/* Inventory */}
      <Box display={open}> <Inventory/></Box>


      {/* Footer */}
      <Footer />
    </Stack>
  );
}
