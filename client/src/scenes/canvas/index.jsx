import React from 'react';
import { Box } from "@mui/material";

const Canvas = () => {
    return (
        <Box
            sx={{
                position: 'absolute', // make it fill the parent container
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: '0', // make it underneath other elements
                display: 'flex',
                justifyContent: 'center',
                // backgroundColor: 'pink',
            }}
        >
            <h1>Canvas</h1>
        </Box>
    );
}

export default Canvas;
