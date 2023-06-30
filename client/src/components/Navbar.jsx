import React, { useState } from "react"
import {
    LightModeOutlined,
    DarkModeOutlined,
    Menu as MenuIcon,
    SettingsOutlined,
    ArrowDropDownOutlined,
    HelpOutlineOutlined, Search,
} from "@mui/icons-material"
import FlexBetween from "components/FlexBetween"
import { useDispatch } from "react-redux"
import { setMode } from "state"
import {AppBar, IconButton, InputBase, Toolbar, useTheme} from "@mui/material";

const Navbar = () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    return (
        <AppBar
            sx={{
                position: "static",
                background: "none",
                boxShadow: "none",
            }}
        >
            <Toolbar
                sx={{ justifyContent: "space-between" }}
            >
                <FlexBetween>
                    <IconButton onClick={() => console.log('Clicking on menu button')}>
                        <MenuIcon/>
                    </IconButton>
                    <FlexBetween
                        backgroundColor={theme.palette.background.default}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.5rem 1rem"
                    >
                        <InputBase placeholder="Search" />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                </FlexBetween>

                <FlexBetween gap="1.5rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlined sx={{ fontSize: "25px"}} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: "25px"}} />
                        )}
                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: "25px"}} />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar