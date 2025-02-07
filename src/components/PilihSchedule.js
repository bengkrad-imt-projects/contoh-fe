import React from "react";
import NavbarP from "./Navbar";
import { useSchedule } from "../hooks/useSchedule"; // Import custom hook

const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const waktu = [
  "07:00 - 09.00",
  "08:00 - 10.00",
  "09:00 - 11.00",
  "10:00 - 12.00",
  "11:00 - 13.00",
  "12:00 - 14.00",
  "13:00 - 15.00",
  "14:00 - 16.00",
  "15:00 - 17.00",
];

function PilihSchedule() {
  const { selectedSchedule, isSaved, isLoading, toggleCheckbox, handleSave, handleEdit } = useSchedule(hari, waktu);

  return (
    <>
      <NavbarP />
      <div className="container" style={{ padding: "5%", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h1>Pilih Waktu Kosong</h1>
        <div className="table-wrapper">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Waktu</th>
                  {hari.map((day, idx) => (
                    <th key={idx}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {waktu.map((time, idx) => (
                  <tr key={idx}>
                    <td>{time}</td>
                    {hari.map((day, idx2) => (
                      <td key={idx2}>
                        <span className="custom-checkbox">
                          <input
                            type="checkbox"
                            id={`checkbox${idx}${day}`}
                            checked={selectedSchedule.isSelected(day, time)}
                            onChange={() => toggleCheckbox(day, time)}
                          />
                          <label htmlFor={`checkbox${idx}${day}`}></label>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="button-wrapper">
            {isSaved ? (
              <button className="btn btn-edit" onClick={handleEdit}>Edit</button>
            ) : (
              <button className="btn btn-save" onClick={handleSave}>Save</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PilihSchedule;
