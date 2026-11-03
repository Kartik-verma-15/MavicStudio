
import { useEffect } from "react";

export default function BackendTest() {
  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => response.json())
      .then((data) => console.log("Backend:", data))
      .catch((error) =>
        console.error("Backend connection failed:", error)
      );
  }, []);

  return <p>Check the browser console for the backend status.</p>;
}
