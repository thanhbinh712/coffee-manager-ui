import React, { useState } from "react";
import QrReader from "react-qr-reader";

const QrCode = (props) => {
  const [qrCode, setQrCode] = useState("chưa có");
  const handleScan = data => {
    if (data) {
      setQrCode(data)
    }
  }
  const handleError = err => {
    console.error(err)
  }
  return (
    <div style={{ marginTop: 50 }}>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "300px",height:"300px" }}
      />
      <p>{qrCode}</p>
    </div>
  );
};

export default QrCode;
