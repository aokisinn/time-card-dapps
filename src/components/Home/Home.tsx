import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import Layout from "../Layout/Layout";
import MonthList from "./MonthList";
import DayArea from "./DayArea";
import { useMemo, useState, useEffect } from "react";
import {
  DesktopDatePicker,
  LoadingButton,
  LocalizationProvider,
  TimePicker,
} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import useSelectedDate from "./useSelectedDate";

const Home = () => {
  const {
    year,
    selectedMonth,
    selectedDay,
    setSelectedDay,
    handleMonthOnClick,
    handleDayOnClick,
  } = useSelectedDate();

  const [value, setValue] = useState<Date | null>(null);

  const getLastDay = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const lastDay = useMemo(
    () => getLastDay(year, selectedMonth),
    [year, selectedMonth]
  );

  useEffect(() => {
    console.log(lastDay);
  }, [lastDay]);

  return (
    <Layout>
      <Grid container spacing={2} sx={{ margin: "25px", height: "100%" }}>
        <Grid item xs={12} md={3} sx={{}}>
          <Typography variant="h6" component="div" sx={{ textAlign: "center" }}>
            {year}年
          </Typography>
          <MonthList
            monthListItemOnClick={handleMonthOnClick}
            selectedMonth={selectedMonth}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          {/* TODO コンポーネント化 */}
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div
                style={{
                  display: "inline",
                  padding: "10px",
                }}
              >
                <DesktopDatePicker
                  label="入力日"
                  inputFormat="MM/dd/yyyy"
                  value={null}
                  onChange={(value) => console.log(value)}
                  renderInput={(params) => <TextField {...params} />}
                  disabled
                />
              </div>
              <div
                style={{
                  display: "inline",
                  padding: "10px",
                }}
              >
                <TimePicker
                  label="開始時刻"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div
                style={{
                  display: "inline",
                  padding: "10px",
                }}
              >
                <TimePicker
                  label="休憩時刻"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div
                style={{
                  display: "inline",
                  padding: "10px",
                }}
              >
                <TimePicker
                  label="終了時刻"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
              <div
                style={{
                  display: "inline",
                  padding: "10px",
                }}
              >
                <LoadingButton
                  variant="contained"
                  size="large"
                  onClick={() => console.log("het")}
                  sx={{
                    margin: "5px",
                  }}
                >
                  登録
                </LoadingButton>
              </div>
            </LocalizationProvider>
            <Paper
              style={{
                maxHeight: 800,
                overflow: "auto",
                marginTop: "20px",
                marginRight: "100px",
              }}
            >
              <DayArea
                lastDay={lastDay}
                selectedDay={selectedDay}
                dayItemOnClick={handleDayOnClick}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;
