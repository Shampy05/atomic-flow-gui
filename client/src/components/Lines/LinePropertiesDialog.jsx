import React, {useState} from "react";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField
} from "@mui/material";

/**
 * Dialog for choosing line properties (color, text, etc.). 
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the dialog is open
 * @param {function} props.onClose - Callback for when the dialog is closed
 * @param {function} props.onSave - Callback for when the dialog is saved
 * 
 * @returns {JSX.Element} LinePropertiesDialog
 */
function LinePropertiesDialog({ isOpen, onClose, onSave }) {
    const [color, setColor] = useState('');
    const [leftText, setLeftText] = useState('');
    const [rightText, setRightText] = useState('');
    const [lineType, setLineType] = useState('single');  // 'single' or 'double'

    /**
     * Callback for when the save button is clicked. Calls the onSave callback
     * with the current line properties.
     * 
     * @returns {void}
     * 
     */
    const handleSave = () => {
        onSave(color, leftText, rightText, lineType);
        onClose();
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle>Choose Line Color and Text</DialogTitle>
            <DialogContent>
                <TextField
                    label="Left Text"
                    variant="outlined"
                    value={leftText}
                    onChange={(e) => setLeftText(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <TextField
                    label="Right Text"
                    variant="outlined"
                    value={rightText}
                    onChange={(e) => setRightText(e.target.value)}
                    fullWidth
                    margin="dense"
                />
                <div>
                    <Button onClick={() => setColor('black')} style={{ color: 'black' }}>
                        Black
                    </Button>
                    <Button onClick={() => setColor('yellow')} style={{ color: 'yellow' }}>
                        Yellow
                    </Button>
                    <Button onClick={() => setColor('red')} style={{ color: 'red' }}>
                        Red
                    </Button>
                    <Button onClick={() => setColor('green')} style={{ color: 'green' }}>
                        Green
                    </Button>
                </div>
                <div>
                    <RadioGroup
                        value={lineType}
                        onChange={(e) => setLineType(e.target.value)}
                    >
                        <FormControlLabel value="single" control={<Radio />} label="Single Line" />
                        <FormControlLabel value="double" control={<Radio />} label="Double Line" />
                    </RadioGroup>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LinePropertiesDialog;