import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function TimeCard({ session }) {
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState([]);

  useEffect(() => {
    getTimeCards();
  }, [session]);

  useEffect(() => {
    supabase
      .from("timeCards")
      .on("INSERT", (payload) => {
        alert("new");
        console.log("Change received!", payload);
      })
      .subscribe();
  }, []);

  async function getTimeCards() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      console.log(user);
      let { data, error, status } = await supabase
        .from("timeCards")
        .select(`id, work_day, start_time, end_time, rest_time`);

      console.log("data");
      console.log(data.id);
      if (error && status !== 406) {
        throw error;
      }

      console.log(data);
      setTest(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log(test);
  }, [test]);

  const addTimeCard = async () => {
    const user = supabase.auth.user();

    const updates = {
      user_uid: user.id,
      work_day: "2022/01/01",
      start_time: "09:00",
    };

    let { error } = await supabase.from("timeCards").upsert(updates, {});

    console.log(error);
  };

  const deleteTimeCard = async (timeCardId) => {
    const { data, error } = await supabase
      .from("timeCards")
      .delete()
      .eq("id", timeCardId);
    console.log(timeCardId);

    console.log(data);
    console.log(error);
  };

  return (
    <div className="form-widget">
      <button onClick={addTimeCard}>テスト</button>
      <li>
        {test.map((data) => {
          return (
            <ul key={data.id}>
              {data.work_day}{" "}
              <button onClick={() => deleteTimeCard(data.id)}>削除</button>
            </ul>
          );
        })}
      </li>
    </div>
  );
}
