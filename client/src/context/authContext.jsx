import { createContext, useReducer, useEffect,useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Reducer function to handle login/logout
export const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };

// Context provider component
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      console.log("local storage",localStorage)
      const storedUser = JSON.parse(localStorage.getItem("user")); // Simulating a stored user fetch
     
      if (storedUser) {
        setUser(storedUser); // Set the user if found
      }
    };
    fetchUser();
  }, []);


  // Save user to localStorage on change
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    );
};
