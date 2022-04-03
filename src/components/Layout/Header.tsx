import { AppBar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
type Props = {
  walletAddress: string;
};
const Header = ({ walletAddress }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Grid container spacing={2}>
          <Grid item xs={12} md={10}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Time Card Dapps
            </Typography>
          </Grid>
          {walletAddress ? (
            <Grid item xs={12} md={2}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {walletAddress.substring(0, 15)}...
              </Typography>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </AppBar>
    </Box>
  );
};

export default Header;
