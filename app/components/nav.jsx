'use client'
import { Typography, Button, Box } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Inventory from "./inventory";

export default function NavNInventory(){

    const [open, setOpen] = useState('none');
    const [opensearch, setOpenSearch] = useState('none');
    const handleOpenSearch = () => setOpenSearch('block');
    const handleCloseSearch = () => setOpenSearch('none');
    const handleOpen = () => setOpen('block');
    const handleClose = () => setOpen('none');

    return(
        <>
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

        </>
    )
}