import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

type Props = {
  lastDay: number;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  shadow: theme,
}));

const MonthArea = ({ lastDay }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(lastDay)].map((_, i) => {
          const day = i + 1;
          return (
            <Grid item xs={2} key={day}>
              <Item>{day}</Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default MonthArea;
