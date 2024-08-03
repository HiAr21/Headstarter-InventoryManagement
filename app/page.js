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
  const [opensearch, setOpenSearch] = useState('none');
  const handleOpenSearch = () => setOpenSearch('block');
  const handleCloseSearch = () => setOpenSearch('none');
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
        p={2}
      >
        <Button variant="outlined"
          onClick={()=>{
          handleClose()
          handleCloseSearch()
          }}>Home</Button>
        <Button variant="outlined"
          onClick={()=>{
          handleOpen()
          handleCloseSearch()
          }}>Inventory</Button>
        <Button variant="outlined"
          onClick={()=>{
            if(opensearch==='none')
            handleOpenSearch()
            else 
            handleCloseSearch()
          }}>Search</Button>
      </Box>

      {/* Inventory */}
      <Box display={open}> <Inventory props={opensearch}/></Box>


      {/* Footer */}
      <Footer />
    </Stack>
  );
}
