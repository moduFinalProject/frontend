import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // URL parameter code and state extraction
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const errorParam = searchParams.get("error");

        // Error handling
        if (errorParam) {
          setError(`Google login failed: ${errorParam}`);
          setLoading(false);
          return;
        }

        // code not received
        if (!code) {
          setError("Failed to receive authentication code");
          setLoading(false);
          return;
        }

        // CSRF attack prevention: state value validation
        const savedState = localStorage.getItem("oauth2-state");
        if (state !== savedState) {
          setError("State value mismatch (CSRF attack detected)");
          localStorage.removeItem("oauth2-state");
          setLoading(false);
          return;
        }

        // Send code to backend for token exchange
        const response = await fetch("https://gaechwi.duckdns.org/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, state }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "An error occurred during login processing");
          setLoading(false);
          return;
        }

        // Login success: save token and redirect to dashboard
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("oauth2-state"); // Remove state value

        // Redirect to dashboard
        navigate("/");
      } catch (err) {
        console.error("Error processing Google callback:", err);
        setError("An error occurred during login processing");
        setLoading(false);
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate]);

  if (loading) {
    return <div>Processing login...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Login failed</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Return to login page</button>
      </div>
    );
  }

  return null;
}
