import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    necessary: true,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookieConsent", JSON.stringify({ analytics: true, marketing: true, necessary: true }));
    setIsVisible(false);
  };

//   const rejectAll = () => {
//     localStorage.setItem("cookieConsent", JSON.stringify({ analytics: false, marketing: false }));
//     setIsVisible(false);
//   };

  const savePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setIsSettingsOpen(false);
    setIsVisible(false);
  };

  return isVisible ? (
    <motion.div
      className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <p className="text-sm">
        We use cookies to improve your experience. Read our{" "}
        <Link to={"/privacy-policy"} target="_blank" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
      <div className="flex space-x-2 mt-2 md:mt-0">
        <button onClick={acceptAll} className="bg-green-500 px-4 py-2 rounded-md">
          Accept All
        </button>
        {/* <button onClick={rejectAll} className="bg-red-500 px-4 py-2 rounded-md">
          Reject All
        </button> */}
        <button onClick={() => setIsSettingsOpen(true)} className="bg-blue-500 px-4 py-2 rounded-md">
          Customize
        </button>
      </div>

      {isSettingsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-black">
            <h2 className="text-lg font-semibold mb-4">Cookie Preferences</h2>
            <label className="flex items-center mb-2 disabled:text-gray-500">
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled={true}
                onChange={() =>
                  setPreferences({ ...preferences, analytics: !preferences.analytics })
                }
              />
              <span className="ml-2 text-gray-500">Necessary Cookies</span>
            </label>
            <label className="flex items-center mb-2 hover:cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() =>
                  setPreferences({ ...preferences, analytics: !preferences.analytics })
                }
              />
              <span className="ml-2">Allow Analytics Cookies</span>
            </label>
            <label className="flex items-center mb-4 hover:cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() =>
                  setPreferences({ ...preferences, marketing: !preferences.marketing })
                }
              />
              <span className="ml-2">Allow Marketing Cookies</span>
            </label>
            <div className="flex space-x-2">
              <button onClick={savePreferences} className="bg-mygreen-500 px-4 py-2 rounded-md text-white">
                Save Preferences
              </button>
              <button onClick={() => setIsSettingsOpen(false)} className="bg-gray-500 px-4 py-2 rounded-md text-white">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  ) : null;
};

export default CookieBanner;
