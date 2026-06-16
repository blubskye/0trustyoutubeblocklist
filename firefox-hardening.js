/* 
   Firefox Zero-Trust Hardening Configuration
   Place this file as 'user.js' in your Firefox profile folder.
*/

// --- REMOTE FONTS ---
user_pref("browser.display.use_document_fonts", 0); // Disable website fonts

// --- IMAGES ---
user_pref("permissions.default.image", 3); // Block 3rd party images
user_pref("dom.placeholder_modifier", true); // Ensure placeholders are used

// --- FINGERPRINTING & PRIVACY ---
user_pref("privacy.resistFingerprinting", true); // Enable core fingerprinting resistance
user_pref("privacy.resistFingerprinting.letterboxing", true); // Prevent window size fingerprinting
user_pref("privacy.trackingprotection.enabled", true);
user_pref("privacy.trackingprotection.socialtracking.enabled", true);
user_pref("privacy.firstparty.isolate", true); // Isolate cookies to the first-party domain

// --- NETWORK & ZERO TRUST ---
user_pref("network.http.referer.XOriginPolicy", 2); // Only send referer if base domains match
user_pref("network.dns.disablePrefetch", true);
user_pref("network.prefetch-next", false);
user_pref("network.http.speculative-parallel-limit", 0);
