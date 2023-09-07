import React from "react";
import { exportToLatex } from "../latexExportLogic";
import {Box, Button} from "@mui/material";

/**
 * Expor button component that exports the current canvas to latex code and
 * displays it in the console. 
 * 
 * @param {function} onExportLatex - function that exports the current canvas to latex code
 * @param {Array} SVGs - array of SVG elements
 * @param {Array} lines - array of line elements
 * 
 * @returns {Object} JSX representation of the export button
 */
const ExportButton = ({ onExportLatex, SVGs, lines }) => {
    const handleExport = async () => {
        const latexCode = exportToLatex(SVGs, lines);

        try {
            await navigator.clipboard.writeText(latexCode);
            alert('Latex code copied to clipboard!'); // Inform the user
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
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