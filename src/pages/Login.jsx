// Login.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Login() {
  const btnRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // load script if not present
    if (window.google) {
      setReady(true);
      return;
    }

    const id = "google-identity";
    if (document.getElementById(id)) {
      // script exists but window.google might not be ready yet
      const timer = setInterval(() => {
        if (window.google) {
          setReady(true);
          clearInterval(timer);
        }
      }, 200);
      return () => clearInterval(timer);
    }

    const s = document.createElement("script");
    s.src = "https://accounts.google.com/gsi/client";
    s.id = id;
    s.async = true;
    s.defer = true;
    s.onload = () => {
      console.log("GSI script loaded");
      setReady(true);
    };
    s.onerror = () => {
      console.error("Failed to load GSI script");
    };
    document.head.appendChild(s);
  }, []);

  // callback when Google returns credential
  const handleGoogleResponse = (response) => {
    if (!response?.credential) {
      console.error("No credential in response", response);
      alert("Google sign-in failed: no credential");
      return;
    }
    try {
      const payload = JSON.parse(atob(response.credential.split(".")[1]));
      console.log("Signed in user:", payload);
      alert(`Signed in as ${payload.email}`);
    } catch (err) {
      console.error("Failed to decode credential", err);
    }
  };

  // initialize and render google button (idempotent)
  const initGoogle = () => {
    if (!window.google) {
      console.error("window.google missing when initGoogle called");
      return;
    }
    // initialize only once
    if (!window._gsiInitialized) {
      window.google.accounts.id.initialize({
        client_id: "284794061832-3cp9tbidnnp24obbtma1u17koe8oja5t.apps.googleusercontent.com",
        callback: handleGoogleResponse,
        // optional: cancel_on_tap_outside: true
      });
      window._gsiInitialized = true;
    }

    // render a Google button into btnRef if present
    if (btnRef.current && btnRef.current.childElementCount === 0) {
      window.google.accounts.id.renderButton(btnRef.current, {
        theme: "outline",
        size: "large",
        type: "standard",
      });
    }
  };

  // call prompt to suggest accounts / show One-Tap
  const handleGoogleSignIn = () => {
    if (!window.google) {
      alert("Google script not loaded yet, please wait a moment.");
      return;
    }
    initGoogle();

    // prompt may show One-Tap or account selector; it may also do nothing if suppressed by Google
    window.google.accounts.id.prompt((notification) => {
      console.log("prompt notification:", notification);
      // notification.isNotDisplayed / isSkipped / etc helpful for debugging
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        console.warn("Google prompt not displayed/skipped", notification);
        alert("Google chooser did not appear. Check console for notification details.");
      }
    });
  };

  // once script ready, init button automatically
  useEffect(() => {
    if (ready) initGoogle();
  }, [ready]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="space-y-4 mt-4">
  <input
    type="text"
    placeholder="Username"
    className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500"
  />

  <input
    type="password"
    placeholder="Password"
    className="w-full border rounded-lg p-3 focus:outline-none focus:border-blue-500"
  />
</div>


        {/* placeholder where Google's rendered button will appear */}
        <div ref={btnRef} />

        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={!ready}
            className={`w-full mt-2 flex items-center justify-center  gap-2  py-3 rounded-lg hover:bg-gray-50 ${
              !ready ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            
          </button>
        </div>

       
      </div>
    </div>
  );
}
