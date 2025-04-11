import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function TeacherDashboard() {
  const [sessions, setSessions] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();

  // Fetch sessions and attendance records
  useEffect(() => {
    const fetchData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("User fetch error:", userError);
        return;
      }

      const teacherId = user.id;

      // Fetch sessions created by this teacher
      const { data: sessionsData, error: sessionsError } = await supabase
        .from("sessions")
        .select("*")
        .eq("teacher_id", teacherId);

      if (sessionsError) {
        console.error("Error fetching sessions:", sessionsError);
      } else {
        setSessions(sessionsData);
      }

      // Fetch attendance records with student info
      const { data: attendanceData, error: attendanceError } = await supabase
        .from("attendance")
        .select("id, session_id, timestamp, profiles (full_name, email)")
        .eq("teacher_id", teacherId);

      if (attendanceError) {
        console.error("Error fetching attendance:", attendanceError);
      } else {
        setAttendanceRecords(attendanceData);
      }
    };

    fetchData();
  }, []);

  const goToQRGenerator = () => {
    navigate("/generate-qr");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">👨‍🏫 Teacher Dashboard</h2>

      {/* SECTION 1: Go to QR Code Generator */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">1️⃣ Generate QR Code for a Session</h3>
        <button
          onClick={goToQRGenerator}
          className="bg-blue-600 text-white py-3 px-5 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          ➕ Go to QR Code Generator
        </button>
      </section>

      {/* SECTION 2: Sessions List */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">2️⃣ Your Created Sessions</h3>
        {sessions.length === 0 ? (
          <p className="text-gray-600 italic">No sessions created yet.</p>
        ) : (
          <ul className="space-y-3">
            {sessions.map((session) => (
              <li key={session.id} className="border p-4 rounded-md shadow-sm bg-white">
                <p><strong>Session Title:</strong> {session.session_title}</p>
                <p><strong>Session ID:</strong> {session.id}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* SECTION 3: Attendance List */}
      <section>
        <h3 className="text-xl font-semibold mb-3">3️⃣ Students Who Attended Your Sessions</h3>
        {attendanceRecords.length === 0 ? (
          <p className="text-gray-600 italic">No students have attended sessions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Student Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Session ID</th>
                  <th className="border px-4 py-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="border px-4 py-2">{record.profiles?.full_name || "N/A"}</td>
                    <td className="border px-4 py-2">{record.profiles?.email || "N/A"}</td>
                    <td className="border px-4 py-2">{record.session_id}</td>
                    <td className="border px-4 py-2">
                      {record.timestamp
                        ? new Date(record.timestamp).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default TeacherDashboard;
