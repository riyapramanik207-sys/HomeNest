import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("homenest_token") || null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => Boolean(sessionStorage.getItem("homenest_token"))
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Call after successful authentication from the backend.
  const login = (authToken) => {
    if (!authToken) {
      throw new Error("A valid authentication token is required.");
    }

    sessionStorage.setItem("homenest_token", authToken);
    setToken(authToken);
    setIsAuthenticated(true);
  };

  // Clear the local authentication session.
  const logout = () => {
    sessionStorage.removeItem("homenest_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const value = {
    token,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for accessing authentication.
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider."
    );
  }

  return context;
}
