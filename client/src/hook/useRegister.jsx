import { useState } from "react"
import { useAuthContext } from "./useAuthContext"



export const useRegister =()=>{
    const[error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext();

    const register = async (email, password, confirmPassword) => {
        setIsLoading(true);
        setError(null);
      
        // Validate confirmPassword before sending it to the backend
        if (password !== confirmPassword) {
          setIsLoading(false);
          setError("Passwords do not match");
          return;
        }
      
        const response = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, confirmPassword }),
        });
      
        const json = await response.json();
      
        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
        }
      
        if (response.ok) {
          localStorage.setItem('user', JSON.stringify(json));
          dispatch({ type: 'LOGIN', payload: json });
          setIsLoading(false);
        }
      };
      
    return{register,isLoading,error}
}