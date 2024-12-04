import { useState } from "react"
import { useNavigate } from "react-router-dom"

/**
 * Custom hook used for calling user information from the book management server
 * @param {string} callType specifies whether a user is being signed up or logged in - `'login'` | `'signup'`
 * @returns 
 */
const useUserInfo = (callType) => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const navigate = useNavigate()

    const submitUser = async () => {
        fetch(`/${callType}`, {
            method: 'POST',
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(token => {
            localStorage.setItem('accessToken', token)
            navigate('/Home')
        })
        .catch(error => navigate(`/Error/${error}`))
    }

    return [user, setUser, submitUser]
}

export { useUserInfo }