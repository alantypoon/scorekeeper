# Scorekeeper React App

This is a React port of the Scorekeeper app, built with Vite.
It includes an iOS project generated with Capacitor.

## Web Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## iOS App

This project uses Capacitor to wrap the web app as a native iOS app.

1.  **Sync Changes**: If you make changes to the React code, build and sync:
    ```bash
    npm run build
    npx cap sync
    ```

2.  **Open in Xcode**:
    ```bash
    npx cap open ios
    ```
    Or open `ios/App/App.xcodeproj` explicitly.

3.  **Run**: In Xcode, select your target (simulator or device) and click the Play button.

## Project Structure

- `src/`: React source code.
- `ios/`: Native iOS project files.
- `dist/`: Built web assets (created after `npm run build`).
