import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";

type Props = {
  selectedMonth: number;
  monthListItemOnClick: (month: number) => void;
};

const MonthList = ({ selectedMonth, monthListItemOnClick }: Props) => {
  return (
    <nav aria-label="main mailbox folders">
      <List>
        {[...Array(12)].map((_, i) => {
          const month = i + 1;
          return (
            <ListItem alignItems="center" key={month}>
              <ListItemButton
                sx={{ textAlign: "center" }}
                divider={true}
                selected={month === selectedMonth}
                onClick={() => monthListItemOnClick(month)}
                style={{
                  background: selectedMonth === month ? blue[100] : "#fff",
                }}
              >
                <ListItemText primary={`${month}月`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};

export default MonthList;
