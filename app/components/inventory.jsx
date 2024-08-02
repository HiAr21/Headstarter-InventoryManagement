'use client'
import React from "react";
import { useState,useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Modal, Typography,Stack, TextField, Button } from "@mui/material";
import { doc,query,collection,getDoc, getDocs, deleteDoc, setDoc} from "firebase/firestore";
import '../globals.css';

function Inventory(){
    let [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemname, setItemName] = useState("");

    const updateInventory = async()=>{
        const snapshot = query(collection(firestore, 'inventory'));
        const docs = await getDocs(snapshot);
        const inventoryList = [];
        docs.forEach(doc => {
        inventoryList.push({
            name: doc.id,
            ...doc.data(),
        });
        });
        setInventory(inventoryList);
    };
    const addItem = async (item)=>{
        const docRef = doc(collection(firestore, 'inventory'),item);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        const {quantity} = docSnap.data();
            await setDoc(docRef, {quantity: quantity+1});
        }else{
        await setDoc(docRef,{quantity: 1});
        }
        await updateInventory()
    }
    const removeItem = async(item)=>{
        const docRef = doc(collection(firestore, 'inventory'),item);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        const {quantity} = docSnap.data();
        if(quantity === 1){
            await deleteDoc(docRef);
        }else{
            await setDoc(docRef, {quantity: quantity-1});
        }
        }
        await updateInventory();
    }
    useEffect(()=>{
        updateInventory()
    },[])
    console.log(inventory);
    const handleOpen = ()=>setOpen(true);
    const handleClose = ()=>setOpen(false);
    
    return(
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
        >
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
            position="absolute" top="50%" left="50%"
            width={400}
            bgcolor="white"
            border="2px solid #000"
            boxShadow={24}
            p={4}
            display={'flex'}
            flexDirection="column"
            gap={3}
            sx={{
                transform:'translate(-50%,-50%)'
            }}
            >
            <Typography variant="h6">Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
                <TextField
                variant="outlined"  
                fullWidth
                value={itemname}
                onChange={(e)=>{
                    setItemName(e.target.value)
                }}
                />
                <Button
                variant="outlined"
                onClick={()=>{
                    addItem(itemname)
                    setItemName('')
                    handleClose()
                }}
                >Add</Button>
            </Stack>
            </Box>
        </Modal>
        <Button
            variant="contained"
            onClick={()=>{
            handleOpen()
            }}
        >Add new item</Button>

        <Box border="1px solid black"> 
            <Box
            width="800px"
            bgcolor={'#ADD8E6'}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100px"
            >
            <Typography variant='h3' color="#333">
                Inventory Items
            </Typography>
            </Box>
            <Box>
            <Stack
                width="800px"
                height="300px"
                spacing={2}
                overflow="auto"
                boxSizing="border-box"
            >
                {
                inventory.map(({name,quantity})=>(
                    // {console.log(item.quantity)}
                    <Box
                    key={name}
                    width="100%"
                    minHeight="40px"
                    bgcolor="#f0f0f0"
                    border="2px solid black"
                    p={2}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    >
                    <Typography
                        variant="h6"
                        color="#333"
                        textAlign="center"
                    >
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography
                        variant="h6"
                        color="#333"
                        textAlign="center"
                    >
                        {quantity}
                    </Typography>
                    <Box display={"flex"} gap={2}>
                        <Button
                        variant="contained" onClick={()=>{
                        addItem(name)
                        }}>Add</Button>
                        <Button
                        variant="contained" onClick={()=>{
                        removeItem(name)
                        }}>Remove</Button>
                    </Box>
                    </Box>
                ))
                }
            </Stack>
            </Box>
        </Box>
        </Box>
    )
}

export default Inventory