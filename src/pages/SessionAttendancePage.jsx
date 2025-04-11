import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../services/supabase";

function SessionAttendancePage() {
  const { sessionId } = useParams(); // Get sessionId from the URL
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSessionAttendance = async () => {
      setLoading(true);
      setError("");

      // Fetch attendance records for the specific session
      const { data, error: queryError } = await supabase
        .from("attendance")
        .select(`
          id,
          created_at,
          student_id,
          profiles:student_id (
            email,
            student_id
          )
        `)
        .eq("session_id", sessionId) // Filter by sessionId from the URL
        .order("created_at", { ascending: false });

      if (queryError) {
        setError("Failed to fetch attendance records.");
        setLoading(false);
        return;
      }

      setAttendanceRecords(data);
      setLoading(false);
    };

    fetchSessionAttendance();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Session Attendance</h1>

      {error && (
        <div className="text-red-600 bg-red-100 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading attendance...</p>
      ) : attendanceRecords.length === 0 ? (
        <p className="text-gray-500">No students attended this session.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md rounded">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="px-4 py-2">Student Email</th>
                <th className="px-4 py-2">Student ID</th>
                <th className="px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record.id} className="border-t">
                  <td className="px-4 py-2">{record.profiles?.email || "N/A"}</td>
                  <td className="px-4 py-2">{record.profiles?.student_id || "N/A"}</td>
                  <td className="px-4 py-2">
                    {new Date(record.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SessionAttendancePage;
