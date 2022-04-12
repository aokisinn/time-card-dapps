import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";

type Props = {
  lastDay: number;
  selectedDay: number;
  dayItemOnClick: (day: number) => void;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  margin: 10,
  textAlign: "center",
  color: theme.palette.text.secondary,
  shadow: theme,
}));

const DayArea = ({ lastDay, selectedDay, dayItemOnClick }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {[...Array(lastDay)].map((_, i) => {
          const day = i + 1;
          return (
            <Grid item xs={2} key={day}>
              <Item
                style={{ background: selectedDay === day ? blue[100] : "#fff" }}
                onClick={() => dayItemOnClick(day)}
              >
                {day}
              </Item>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DayArea;
