import { AppBar, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
      </AppBar>
    </Box>
  );
};

export default Header;
