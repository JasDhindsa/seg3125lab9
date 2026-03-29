import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { SearchTutorsPage } from "./pages/SearchTutorsPage";
import { TutorProfilePage } from "./pages/TutorProfilePage";
import { BookSessionPage } from "./pages/BookSessionPage";
import { StudentDashboard } from "./pages/StudentDashboard";
import { BookingConfirmationPage } from "./pages/BookingConfirmationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/search",
    Component: SearchTutorsPage,
  },
  {
    path: "/tutor/:id",
    Component: TutorProfilePage,
  },
  {
    path: "/book/:tutorId",
    Component: BookSessionPage,
  },
  {
    path: "/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/confirmation/:bookingId",
    Component: BookingConfirmationPage,
  },
]);
