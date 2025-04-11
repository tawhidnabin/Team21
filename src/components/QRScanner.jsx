import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import QrScanner from "react-qr-scanner";

function QRScanner() {
  const [scanResult, setScanResult] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id);
    };
    getUser();
  }, []);

  const handleScan = async (data) => {
    if (!data || scanResult) return;
    setScanResult(data.text);

    const { data: session, error: sessionError } = await supabase
      .from("sessions")
      .select("id")
      .eq("qr_token", data.text)
      .single();

    if (sessionError || !session) {
      setError("Invalid QR code.");
      return;
    }

    const { error: insertError } = await supabase.from("attendance").insert([
      {
        session_id: session.id,
        student_id: userId,
        status: "present",
      },
    ]);

    if (insertError) {
      setError("Already marked or failed to insert attendance.");
    } else {
      setMessage("✅ Attendance recorded successfully!");
    }
  };

  const handleError = () => {
    setError("Camera error or permission denied.");
  };

  return (
    <div className="bg-white p-6 rounded shadow text-center">
      <h2 className="text-lg font-bold mb-4">📷 Scan QR Code</h2>
      <QrScanner
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {message && <p className="text-green-600 mt-2">{message}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default QRScanner;
