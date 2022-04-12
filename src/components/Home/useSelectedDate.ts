import { useState, useCallback } from "react";

const makeNowDate = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1;
  const day = nowDate.getDate();

  return {
    year,
    month,
    day,
  };
};

export default function useSelectedDate() {
  const { year, month, day } = makeNowDate();

  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedDay, setSelectedDay] = useState(day);

  const handleMonthOnClick = useCallback(
    (month: number) => {
      setSelectedMonth(month);
      setSelectedDay(1);
    },
    [setSelectedMonth, setSelectedDay]
  );

  const handleDayOnClick = useCallback(
    (day: number) => {
      setSelectedDay(day);
    },
    [setSelectedDay]
  );

  return {
    year,
    selectedMonth,
    selectedDay,
    setSelectedDay,
    handleMonthOnClick,
    handleDayOnClick,
  };
}
