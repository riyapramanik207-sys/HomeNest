import {
  createContext,
  useContext,
  useState,
} from "react";
const UserContext = createContext(null);
const initialUser = null;
export function UserProvider({ children }) {
  const [user, setUser] = useState(initialUser);

  // Save the profile received from your backend.
  const setUserProfile = (profile) => {
    if (profile === null || profile === undefined) {
      setUser(null);
      return;
    }

    setUser({
      id: profile.id ?? null,
      name: profile.name ?? "",
      email: profile.email ?? "",
      phone: profile.phone ?? "",
      role: profile.role ?? "STUDENT",
      ...profile,
    });
  };

  // Update selected fields without replacing the whole profile.
  const updateUser = (updates) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser;
      }

      return {
        ...currentUser,
        ...updates,
      };
    });
  };

  // Clear the current profile on logout.
  const clearUser = () => {
    setUser(null);
  };

  const value = {
    user,
    setUserProfile,
    updateUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for accessing the user profile.
export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUser must be used inside a UserProvider."
    );
  }

  return context;
}
