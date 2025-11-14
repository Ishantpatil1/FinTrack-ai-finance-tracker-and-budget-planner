# Deployment Guide

This repository is a monorepo with `backend/` (Node/Express) and `frontend/` (Vite + React).

Backend (Render)
- Create a new Web Service on Render and connect your GitHub repo.
- Use the following settings:
  - Environment: `Node`
  - Build command: `cd backend && npm install`
  - Start command: `cd backend && npm run start`
  - Instance type/region: your preference (free tier available)
- In the service's Environment settings add these environment variables:
  - `MONGO_URL` (your MongoDB Atlas connection string)
  - `JWT_SECRET`
  - `EMAIL_USER`
  - `EMAIL_PASS`
  - `API_KEY`

Frontend (Vercel)
- On Vercel, create a new project from your Git repository.
- Set the root build to use the `frontend` package.json (Vercel will auto-detect in many cases). If Vercel doesn't auto-detect, set the following:
  - Framework Preset: `Other`
  - Build Command: `npm run build` (Vercel will run this in the `frontend` directory if project is configured to that root)
  - Output Directory: `dist`
- Alternatively, in the Vercel dashboard set the Project's "Root Directory" to `/frontend` and leave build command `npm run build` and output `dist`.

Notes
- Do NOT commit real secrets to the repository. Use the Render and Vercel dashboards to set environment variables.
- If your backend fails to connect to Atlas, ensure your Atlas Network Access includes Render's outbound IPs (or allow 0.0.0.0/0 while testing).
- After deployment, check Render service logs and Vercel build logs for errors.

Local testing
- Copy `backend/.env.example` to `backend/.env` and fill values, then run:
  ```powershell
  cd backend
  npm install
  npm run start
  ```
