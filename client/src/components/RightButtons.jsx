import React from 'react';
import { Box, Button } from "@mui/material";
import { ZoomIn, ZoomOut, GridOn } from "@mui/icons-material";

const RightButtons = ({ onSnapToGrid, onZoomIn, onZoomOut }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column', // Stack the buttons vertically
                justifyContent: 'center', // Center the buttons vertically
                alignItems: 'center', // Center the buttons horizontally
                position: 'absolute',
                top: '50%',  // Move to the middle of the parent
                right: 20,  // Provide some space from the right
                transform: 'translateY(-50%)', // Centering trick
                backgroundColor: 'transparent',
                zIndex: 2,
            }}
        >
            <Button variant="contained" color="primary" onClick={onSnapToGrid} sx={{ width: '100px', marginBottom: '10px' }}>
                <GridOn />
            </Button>
            <Button variant="contained" color="primary" onClick={onZoomIn} sx={{ width: '100px', marginBottom: '10px' }}>
                <ZoomIn />
            </Button>
            <Button variant="contained" color="primary" onClick={onZoomOut} sx={{ width: '100px' }}>
                <ZoomOut />
            </Button>
        </Box>
    )
}

export default RightButtons;
