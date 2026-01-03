# Publishing to TestFlight

Since I cannot access your Apple Developer account directly, you will need to perform the final steps in Xcode and App Store Connect. Here is a step-by-step guide to get your app onto TestFlight.

## Prerequisites
- **Apple Employee / Developer Account**: You must be enrolled in the Apple Developer Program.
- **Xcode**: Installed on your Mac.

## Step 1: Prepare the Web Build
Ensure your latest changes are built and synced to the iOS project.

```bash
cd scorekeeper-react
npm run build
npx cap sync
```

## Step 2: Open Project in Xcode
Open the iOS project using the Capacitor CLI:

```bash
npx cap open ios
```

## Step 3: Configure Signing & Capabilities
1. In Xcode, click on the **App** project in the left navigator configuration tree.
2. Select the **App** target in the main view.
3. Go to the **Signing & Capabilities** tab.
4. **Team**: Select your Apple Developer Team.
   - If you don't see one, log in via Xcode Preferences > Accounts.
5. **Bundle Identifier**: Ensure `com.alantypoon.scorekeeper` is unique and registered to you. If you need to change it, update it here and in `capacitor.config.json`.

## Step 4: Create App Record in App Store Connect
1. Go to [App Store Connect](https://appstoreconnect.apple.com/).
2. Click **My Apps** > **+** > **New App**.
3. Select **iOS**.
4. **Name**: "Scorekeeper" (or unique name).
5. **Bundle ID**: Select the one matching your Xcode project (`com.alantypoon.scorekeeper`).
6. **SKU**: Enter a unique ID (e.g., `scorekeeper_react_001`).

## Step 5: Archive and Upload
1. In Xcode, ensure you have selected **Any iOS Device (arm64)** as the build target (top bar, next to the Play button).
2. Go to **Product** > **Archive**.
3. Wait for the build to finish. The **Organizer** window will open.
4. Click **Distribute App**.
5. Select **TestFlight & App Store**.
6. Follow the prompts (Keep default settings usually works: "Upload", "Automatically manage signing").
7. Click **Upload**.

## Step 6: Release in TestFlight
1. Once uploaded, go back to [App Store Connect](https://appstoreconnect.apple.com/).
2. Select your app and go to the **TestFlight** tab.
3. You should see your build processing (it may take 10-20 mins).
4. Once "Ready to Submit" or "Missing Compliance", click it.
   - If asked about encryption, usually you can select "No" and "Standard Encryption" if you just use HTTPS.
5. **Internal Testing**: Click (+) next to Internal Testing, create a group, and add yourself. You will get an email implementation immediately.
6. **External Testing**: Create a group, add users via email. Requires a short Beta App Review (usually < 24h).

## Troubleshooting
- **Signing Errors**: Ensure your Apple Developer Team is selected in Xcode.
- **Bundle ID Errors**: The Bundle ID must be globally unique. If taken, change it in `capacitor.config.json` and Xcode.
- **Icon Errors**: You may need app icons. You can generate them using `npx @capacitor/assets`.
