# Ofek-42 Countdown App

This is a static React application built with Vite and Tailwind CSS. It displays a countdown to July 5, 2025, and shows a message when the date is reached.

## Features

- RTL layout (Hebrew) with Tailwind CSS styling.
- Live countdown timer (days, hours, minutes, seconds).
- Redirects to a message when the countdown finishes.
- Deploys automatically to GitHub Pages using a GitHub Actions workflow.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:5173).

## Production Build

To build the project for production:
```bash
npm run build
```

The production files will be in the `dist/` directory.

## Deployment

This repository is configured to deploy to GitHub Pages on every push to the `main` branch. The Vite `base` option is set to `/{repository-name}/` (default is `/ofek-42/`). If your repository has a different name, update the `base` field in `vite.config.js` accordingly.

The deployment workflow is defined in `.github/workflows/deploy.yml` and uses the `peaceiris/actions-gh-pages` action to publish the `dist/` folder to the `gh-pages` branch.

## License

This project is licensed under the MIT License.
