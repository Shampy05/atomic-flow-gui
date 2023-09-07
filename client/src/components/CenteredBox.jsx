const { styled } = require("@mui/system");
const { Box } = require("@mui/material");

/**
 * A centered box that takes up the entire screen. 
 */
const CenteredBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'background.paper',
})

export default CenteredBox;