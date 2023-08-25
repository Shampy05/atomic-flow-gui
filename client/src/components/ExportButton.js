import React from "react";
import { exportToLatex } from "../latexExportLogic";
import {Box, Button} from "@mui/material";

const ExportButton = ({ onExportLatex, SVGs, lines }) => {
    const handleExport = () => {
        const latexCode = exportToLatex(SVGs, lines);
        console.warn("latexCode", latexCode);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: "5%",
                right: 20,
                transform: 'translateY(-50%)',
                backgroundColor: 'transparent',
                zIndex: 2,
            }}
        >
            <Button
                variant="contained"
                color="primary"
                className='export-button button'
                onClick={handleExport}
            >
                Export
            </Button>
        </Box>
    );
}

export default ExportButton;