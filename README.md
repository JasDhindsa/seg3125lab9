# TutorConnect
A university Human-Computer Interaction lab project (Lab 8 & Lab 9 Prep). 
This application is a functional React website designed to demonstrate human interaction processes.

## Human Interaction Processes Demonstrated
1. **Exploring**: Users can browse tutors on the *Search Tutors* page (`/search`), viewing different subjects and profiles.
2. **Planning**: Users can select a specific tutor and plan a session by opening their profile and navigating to the *Book Session* page (`/book/:tutorId`).
3. **Communicating**: Users input their details, session topic, and meeting preferences via forms on the *Book Session* page. 
4. **Analyzing Results**: Once booked, the system provides feedback via the *Booking Confirmation* page (`/confirmation/:bookingId`) and shows a summary of the booking on the *Student Dashboard* (`/dashboard`).

## How to Run the Project (Lab 9)
1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the Full Stack (Frontend + Backend)**:
   ```bash
   npm run dev:all
   ```
   *Note: This command uses `concurrently` to launch the **Vite** frontend and the **Express/SQLite** backend simultaneously.*
4. **Access the App**:
   - **Frontend**: http://localhost:5173 (or as shown in terminal)
   - **Backend API**: http://localhost:5000/api/tutors

---

## Lab 9 Requirements Implemented
- **Bilingual Support**: Toggle between English and French via the globe icon in the Navbar. All subjects, buttons, and dashboard text are localized.
- **SQL Database**: Persistent storage for tutors and bookings using **SQLite**.
- **Student Dashboard**: Live tracking of upcoming and past sessions fetched from the database.
- **Persistent Actions**: Booking cancellations are saved directly to the database.
- **UX Heuristics**: Added loading states (Spinners) for visibility of system status, and confirmation dialogs for user control and freedom.

## GitHub Folder Structure
```
TutorConnect/
├── server/                 # Express backend & SQLite database
│   ├── index.js            # API Endpoints (GET/POST/PATCH)
│   ├── database.js         # SQLite connection & Seeding logic
│   └── tutorconnect.db     # Auto-generated database file
├── src/
│   ├── i18n/               # Internationalization configs (en.json, fr.json)
│   ├── app/
│   │   ├── components/     # UI components (Navbar, LanguageToggle, etc.)
│   │   └── pages/          # Search, Booking, Dashboard, Help
│   └── lib/                # Shadcn UI core components
└── ... (configs)
```

## Group Member Contributions
- We all worked on the project together, equally.

Made by Team 18