import React from "react";
import { exportToLatex } from "../utils/latexExport";
import {Box, Button} from "@mui/material";

const ExportButton = ({ onExportLatex }) => {
    const handleExport = () => {
        const latexCode = exportToLatex({type: "TriangleWithTopLine"});
        console.log(latexCode);
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