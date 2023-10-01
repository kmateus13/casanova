"use client"

import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Skeleton, Tooltip } from "@mui/material";
import { FiLogOut } from "react-icons/fi"
import { use, useEffect, useState } from "react";
import { auth } from "@/firebase/authentication"
import { usePathname } from 'next/navigation'

export default function Header({pagina}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [foto, setFoto] = useState()
    const [name, setName] = useState()
    const userLogado = auth.currentUser

    useEffect(() => {

        auth.onAuthStateChanged((user) => {
            if (user) {
                setFoto(user.photoURL)
                setName(user.displayName)
            } else {
                window.location.href = '/'
            }
        })
    }, [])



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const desconectar = () => {
        const user = auth.currentUser
        if (user) {
            auth.signOut()
            window.location.href = '/'
        }
    }


    return (
        <header className=" h-16 md:px-28 px-6 bg-slate-600 flex items-center justify-between">
            <nav>
                <ul className="flex text-white font-semibold">
                    <li><a href={pagina === "Home"? "/home" : "/adicionar"}>{pagina}</a></li>

                </ul>
            </nav>
            <div className="flex items-center">
                {userLogado ? (
                    <label className="text-white font-semibold">{name}</label>
                ) : (
                    <Skeleton variant="rounded" width={210} height={20} />
                )
                }
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Tooltip title="Sair da conta">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2 }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >

                            {userLogado ? (
                                <Avatar sx={{ width: 45, height: 45 }} src={foto}></Avatar>
                            ) : (
                                <Skeleton variant="circular" width={45} height={45} />
                            )}

                        </IconButton>
                    </Tooltip>
                </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >

                    <MenuItem onClick={desconectar}>
                        <ListItemIcon>
                            <FiLogOut />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </div>
        </header>
    )
}