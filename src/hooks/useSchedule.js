import { useState, useEffect } from "react";
import axios from "axios";
import { Schedule } from "../utils/Schedule"; // import helper class

const apiURL = "http://127.0.0.1:3005/selected-schedule";

export function useSchedule(hari, waktu) {
  const [selectedSchedule, setSelectedSchedule] = useState(new Schedule());
  const [isSaved, setIsSaved] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      console.log("Fetching data from API...");
      const response = await axios.get(apiURL);
      console.log("Response dari API:", response.data);

      if (!response.data || response.data.length === 0) {
        throw new Error("Data kosong atau tidak ditemukan");
      }

      const data = response.data[0].jadwal;
      console.log("Data jadwal yang diambil:", data);

      const schedule = new Schedule().generateScheduleFromApi(data, hari, waktu);
      console.log("Schedule setelah diproses:", schedule);

      setSelectedSchedule(schedule);
      setIsSaved(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleCheckbox = (day, time) => {
    const updatedSchedule = selectedSchedule.toggleTime(day, time);
    setSelectedSchedule(updatedSchedule);
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (window.confirm("Apakah Anda yakin untuk menyimpan?")) {
      setIsSaved(true);
      try {
        const payload = selectedSchedule.toDatabaseFormat(hari, waktu);
        await axios.post(apiURL, payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Data berhasil disimpan ke server!");
      } catch (error) {
        console.error("Gagal menyimpan data ke server:", error);
        alert("Gagal menyimpan data, coba lagi.");
      }
    }
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return {
    selectedSchedule,
    isSaved,
    isLoading,
    toggleCheckbox,
    handleSave,
    handleEdit,
  };
}
