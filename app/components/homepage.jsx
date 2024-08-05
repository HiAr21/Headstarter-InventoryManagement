'use client'
import React from "react";
import {useState} from "react";
import {Box} from "@mui/material";
import NavNInventory from "./nav";

export default function Homepage(){

    const [open, setOpen] = useState('block');

    return(
        <>
        <Box display={open}>
            <NavNInventory/>
        </Box>
        </>
    )
}