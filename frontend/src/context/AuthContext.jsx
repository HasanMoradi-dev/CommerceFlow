import {createContext , useState} from "react";
import api from "../api/axios.js";
import {Navigate} from "react-router-dom";

export const AuthContext = createContext()


export function AuthProvider({children}) {

    const [user , setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null)

    const [tokens , setTokens] = useState(() => JSON.parse(localStorage.getItem("tokens")) ||null )

    const [loading , setLoading] = useState(false)

    const [error,setError] = useState(null)

    async function login(username,password) {

       try {
           setLoading(true)
           setError(null)

            const response = await api.post("/auth/jwt/create/",{username,password});

        setTokens(response.data);

        localStorage.setItem("tokens",JSON.stringify(response.data));
           const userResponse = await api.get("/auth/users/me")

        setUser(userResponse.data)

        localStorage.setItem("user",JSON.stringify(userResponse.data));

        return true

       }catch (err) {
           setError("Username or Password is incorrect")
       }finally {
           setLoading(false)
       }


    }

    function logout(){
        setUser(null)
        setTokens(null)
        localStorage.removeItem("user")
        localStorage.removeItem("tokens")
    }

    async function register(formData){

        try {
            setLoading(true)
            setError(null)
                    const res = await api.post("/auth/users/" , {
            username : formData.username,
            password : formData.password,
            re_password : formData.confirmPassword ,
            email : formData.email

        })

        const {data} = await api.post("/auth/jwt/create" , {
            username : formData.username,
            password : formData.password
        })

        localStorage.setItem("tokens",JSON.stringify(data))
        setTokens(data)

        const user = await api.get("/auth/users/me")

        setUser(user.data)
        return true
        }catch (err){
     
            const message = err.response?.data ?
                Object.values(err.response.data).flat().join(" ") : "Something went Wrong. Please try again or contact support."
        }finally {
            setLoading(false)
        }



    }



    return(
        <AuthContext.Provider value={{user,tokens,login,logout,loading,error,register}}>
            {children}
        </AuthContext.Provider>
    )
}