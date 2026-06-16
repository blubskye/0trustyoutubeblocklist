# Zero-Trust Browser Hardening & System-Wide Audio Optimization

This repository provides scripts, configurations, and documentation for establishing a "Zero Trust" environment for web browsing and audio processing. 

**Note:** This project is a work-in-progress. I am currently developing a **kernel-level patch** to address these issues at the OS level for ultimate security and control. This repository serves as the user-land mitigation strategy in the interim.

## 🛠 Browser Hardening

### 1. Firefox Hardening (about:config)
For maximum privacy and to assist in blocking thumbnails/avatars at the browser level, apply the following settings in `about:config`:

| Preference | Value | Description |
| :--- | :--- | :--- |
| `browser.display.use_document_fonts` | `0` | Disable website-specific fonts (prevents icon-font tracking). |
| `permissions.default.image` | `3` | Block 3rd party images (crucial for blocking CDN-hosted thumbnails). |
| `privacy.resistFingerprinting` | `true` | Enable core Firefox privacy protections. |
| `dom.placeholder_modifier` | `true` | Show placeholders for blocked images. |
| `network.http.referer.XOriginPolicy` | `2` | Only send referer headers when domains match. |
| `privacy.firstparty.isolate` | `true` | Isolate cookies and data to the site's own domain. |
| gfx.downloadable_fonts.enabled | false | Prevent downloading 3rd party fonts |

You can also use the `firefox-hardening.js` file by placing it in your Firefox profile folder as `user.js` to automate these settings.

### 2. Block Profile Pictures & Thumbnails (uBlock Origin)
Import the contents of `ublock-filters.txt` into the "My filters" tab of your uBlock Origin dashboard. This uses cosmetic and network filters to target:
*   CSS classes/IDs containing "avatar", "profile", "thumb".
*   Network requests to known gravatar and thumbnail CDNs.
*   **Universal YouTube Coverage:** Specific rules for YouTube's evolving DOM (e.g., `ytThumbnailViewModel`, `yt-img-shadow`) and network blocks for `ytimg.com` and `ggpht.com` to ensure all thumbnails and avatars are suppressed.

---

## 🎧 System-Wide Audio Hardening

### ⚠️ Security Alert: Ultrasonic Sidechannel Attacks
There is a potential sidechannel attack in the wild that exploits human hearing limitations (ultrasonic/infrasonic frequencies) to track devices or transmit data via audio. To mitigate this in a zero-trust environment, it is highly recommended to apply a **Bandpass Filter**.

**Recommended Frequency Ranges:**
*   **Standard Protection:** 80Hz - 15kHz (Preserves most audio quality while cutting extreme high/low frequencies).
*   **Strict Protection:** 300Hz - 11kHz (Maximum security for voice-centric or high-risk environments).

**Implementation:**
** PLEASE NOTE ONCE A KERNEL PATCH IS ROLLED OUT BY ME THAT WORKS FOR LINUX AND BSD THAT WILL BE THE RECOMMENDED WAY SINCE IT'S AT THE KERNEL LEVEL**
*   **Hardware (Preferred):** Use a physical hardware equalizer or DSP (Digital Signal Processor) between your device and speakers/headphones.
*   **Software:** Use the recommended equalizers below to set a steep high-pass and low-pass filter at the specified frequencies.

| Platform | Recommended Software | Type |
| :--- | :--- | :--- |
| **Windows** | Equalizer APO + Peace GUI | System-Wide (APO) | Patch unavalible via kernel due to being closed soource|
| **Linux/BSD** | EasyEffects (Pipewire/Pulse) | System-Wide | Patch in progress |
| **macOS** | eqMac / SoundSource | System-Wide | kernel patch unavible since it is closed source for osx |
| **Android** | DSP rootless if possible if your device supports it. If not then physical bandpass until kernel patch is rolled out for android. Make sure beta firefox for about:config support| 
| **iOS** | Audiogram Hack / iOS 27 Native | Accessibility / Native | Browser is all safari based so no patch avalible/fix firefox/chrome just safari skins

---

## 📂 Repository Structure
*   `README.md`: This guide.
*   `firefox-hardening.js`: A `user.js` style config for Firefox.
*   `ublock-filters.txt`: Filter list for uBlock Origin.
