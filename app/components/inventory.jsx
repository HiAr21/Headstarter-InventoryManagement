'use client'
import React from "react";
import { useState,useEffect } from "react";
import { firestore } from "@/firebase";
import { Box,Avatar, Modal, Typography,Stack, TextField, Button } from "@mui/material";
import { doc,query,collection,getDoc, getDocs, deleteDoc, setDoc} from "firebase/firestore";
import '../globals.css';

function Inventory(props){
    let [inventory, setInventory] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemname, setItemName] = useState("");
    const [itemquantity, setItemQuantity] = useState(0);

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
    const addItem = async (item,quant)=>{
        const docRef = doc(collection(firestore, 'inventory'),item);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const {quantity} = docSnap.data();
            console.log("ha"+quantity);
            const a=parseInt(quantity)+parseInt(quant);
            await setDoc(docRef, {quantity: a});
            console.log("hun"+quantity);
        }else{
        await setDoc(docRef,{quantity: quant});
        }
        await updateInventory()
    }
    const plusOneItem = async (item)=>{
        const docRef = doc(collection(firestore, 'inventory'),item);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        const {quantity} = docSnap.data();
            await setDoc(docRef, {quantity: quantity+1});
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
    const deleteItem = async(item)=>{
        const docRef = doc(collection(firestore, 'inventory'),item);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
        const {quantity} = docSnap.data();
        await deleteDoc(docRef);
        }
        await updateInventory();
    }
    useEffect(()=>{
        updateInventory()
    },[])
    // console.log(inventory);
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
                label="Item name"
                fullWidth
                value={itemname}
                onChange={(e)=>{
                    setItemName(e.target.value)
                }}
                />
                <TextField
                variant="outlined"
                label="Count"
                type="number"
                value={itemquantity}
                onChange={(e)=>{
                    setItemQuantity(e.target.value)
                }}
                />
                <Button
                variant="outlined"
                onClick={()=>{
                    addItem(itemname,itemquantity)
                    setItemName('')
                    setItemQuantity(0)
                    handleClose()
                }}
                >Add</Button>
            </Stack>
            </Box>
        </Modal>

        <Box border="1px solid grey" borderRadius={5}> 
            <Box
            width="800px"
            bgcolor={'#ADD8E6'}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="100px"
            p={2}
            borderRadius={5}
            >
                <Typography variant='h4' color="#333">
                    Inventory Items
                </Typography>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Box display={props.props}>
                    <TextField
                        variant="outlined"
                        label="Search"
                    />
                    </Box>
                    <Button
                        variant="contained"
                        onClick={()=>{
                        handleOpen()
                        }}
                    >Add new item</Button>
                    <Button
                    >
                        <svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_14_1859)">
                        <path d="M8 46V47.5C8 48.6935 8.47411 49.8381 9.31802 50.682C10.1619 51.5259 11.3065 52 12.5 52H51.5C52.6935 52 53.8381 51.5259 54.682 50.682C55.5259 49.8381 56 48.6935 56 47.5V46" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M31.999 13V40" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M41 19L31.999 13L23 19" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_14_1859">
                        <rect width="51.999" height="42.999" fill="white" transform="translate(6 11)"/>
                        </clipPath>
                        </defs>
                        </svg>
                    </Button>
                </Box>
            </Box>
            <Box>
            <Stack
                width="800px"
                height="auto"
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
                    height="auto"
                    // bgcolor="#f0f0f0"
                    // border="2px solid black"
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
                    <Box display={"flex"}>
                        <Button
                        onClick={()=>{
                        removeItem(name)
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12L18 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>
                        <Button
                        onClick={()=>{
                        plusOneItem(name)
                        }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 12H18M12 6V18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Button>
                        <Button onClick={()=>{
                        deleteItem(name)
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                        </svg>
                        </Button>
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