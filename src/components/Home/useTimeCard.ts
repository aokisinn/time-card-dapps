import { supabase } from "@/utils/supabaseClient";
import { useState, useCallback } from "react";

type TimeDate = {
  id: number;
  workDay: string;
  startTime: string;
  endTime: string;
  restTime: string;
};

export default function useTimeCard() {
  const [timeDates, setTimeDate] = useState<TimeDate[]>([]);

  const getTimeDate = async (year: number) => {
    const { data, error, status } = await supabase
      .from("timeCards")
      .select(`id, work_day, start_time, end_time, rest_time`);
  };
  return {};
}
