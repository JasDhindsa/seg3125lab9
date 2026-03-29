import { RouterProvider } from "react-router";
import { router } from "./routes";
import { HelpSection } from "./components/HelpSection";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <HelpSection />
      <Toaster />
    </>
  );
}