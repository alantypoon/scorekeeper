# Sideloading to iPhone (Free Apple ID)

You can run this app on your iPhone using a free Apple ID. The app will work for **7 days** before you need to reinstall it (re-run these steps).

## Prerequisites
1.  **Xcode** is open (if not, run `npx cap open ios`).
2.  **iPhone** is connected to your Mac via USB cable.

## Step 1: Configure Signing in Xcode

1.  In Xcode, click the **App** project in the left sidebar (the blue icon at the very top).
2.  In the main view, select the **App** target (under "Targets").
3.  Click the **Signing & Capabilities** tab at the top.
4.  **Team**: Click the dropdown.
    *   If you don't see your name, choose **Add an Account...** and log in with your personal Apple ID.
    *   Once logged in, select your **Personal Team** (e.g., "Alan (Personal Team)").
5.  **Bundle Identifier**:
    *   If you see an error saying "Bundle ID not available" or similar, change `com.alantypoon.scorekeeper` to something unique like `com.alantypoon.scorekeeper.local`.

## Step 2: Trust Your Device

1.  Unlock your iPhone.
2.  If asked, tap **Trust** on the "Trust This Computer" popup.

## Step 3: Run the App

1.  In the top-left of Xcode (near the Play button), click the device selector (it might say "Any iOS Device" or "iPhone 16 Pro").
2.  Select your **connected iPhone** from the list.
3.  Click the **Play** button (▶) to build and install.

## Step 4: Trust the Developer (First Time Only)

The app will install but might not open immediately. You will see an "Untrusted Developer" popup.

1.  On your iPhone, go to **Settings** > **General** > **VPN & Device Management** (or "Device Management").
2.  Tap your email address under "Developer App".
3.  Tap **Trust <Your Email>**.
4.  Go back to the home screen and open **Scorekeeper**.
