// // components/CredentialModal.tsx
// "use client";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import { encrypt } from "@/utils/encryptUtils";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Button,
//   Typography
// } from "@mui/material";

// export default function CredentialModal() {
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     const emailCookie = Cookies.get("encrypted_email");
//     const passwordCookie = Cookies.get("encrypted_password");
//     if (!emailCookie || !passwordCookie) {
//       setOpen(true);
//     }
//   }, []);

//   const handleSave = () => {
//     Cookies.set("encrypted_email", encrypt(email), { expires: 30 });
//     Cookies.set("encrypted_password", encrypt(password), { expires: 30 });
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open}>
//       <DialogTitle>Enter LinkedIn Credentials</DialogTitle>
//       <DialogContent>
//         <Typography variant="body2" sx={{ mb: 2 }}>
//           We don’t store your LinkedIn credentials. They are securely stored in your browser using encryption.
//         </Typography>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="LinkedIn Email"
//           type="email"
//           fullWidth
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           margin="dense"
//           label="Password"
//           type="password"
//           fullWidth
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSave} variant="contained">Save Securely</Button>
//       </DialogActions>
//     </Dialog>
//   );
// }
"use client";
import { useEffect, useState } from "react";
import { encrypt } from "@/utils/encryptUtils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Alert
} from "@mui/material";

export default function CredentialModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkEncryptionStatus();
  }, []);

  const checkEncryptionStatus = async () => {
    try {
      const res = await fetch("https://linkedboost-backend.onrender.com/check-encrypted-credentials", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to check encryption status");
      }

      const { encrypted_credentials_present } = await res.json();
      if (!encrypted_credentials_present) {
        setOpen(true);
      }
    } catch (err) {
      console.error("Error checking encryption status:", err);
      setError(
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Failed to check credential status"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://linkedboost-backend.onrender.com/store-encrypted-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({
          email,  // The API will handle encryption
          password // The API will handle encryption
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Failed to save credentials");
      }

      const result = await res.json();
      console.log(result.msg); // Log success message
      setOpen(false);
    } catch (err) {
      console.error("Error saving credentials:", err);
      setError(
        err && typeof err === "object" && "message" in err
          ? (err as { message: string }).message
          : "Failed to save credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading && !open) {
    return null;
  }

  return (
    <Dialog 
      open={open} 
      onClose={() => {}} 
      disableEscapeKeyDown
    >
      <DialogTitle>Enter LinkedIn Credentials</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Your LinkedIn credentials will be securely encrypted and stored on the server.
          This is required for automation features to work.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          autoFocus
          margin="dense"
          label="LinkedIn Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleSave} 
          variant="contained"
          disabled={loading}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Saving...
            </>
          ) : (
            "Save Securely"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}