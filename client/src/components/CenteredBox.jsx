const { styled } = require("@mui/system");
const { Box } = require("@mui/material");

const CenteredBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'background.paper',
})

export default CenteredBox;