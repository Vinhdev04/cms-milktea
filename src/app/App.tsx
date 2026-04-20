import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { UserAuthProvider } from "./context/UserAuthContext";

export default function App() {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </AuthProvider>
  );
}