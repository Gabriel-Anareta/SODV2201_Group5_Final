import { useEffect, useState } from "react"
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
        try {
            const res = await fetch(`/${callType}`, {
                method: 'POST',
                headers: { "Content-Type": "Application/JSON" },
                body: JSON.stringify(user)
            })
            if (!res.ok){
                const data = await res.json()
                throw new Error(`${data.message}`)
            }
            const data = await res.json()
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem('username', data.username)
            navigate('/Home')
        }
        catch (error) {
            navigate(`/Error/${error}`)
        }
    }

    return [user, setUser, submitUser]
}

const useTokenVerification = () => {
    const navigate = useNavigate()

    const GetToken = () => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            const msg = "401 - Unauthorized"
            navigate(`/Error/${msg}`)
            return null
        }

        return token
    }

    const verifyToken = async () => {
        const token = GetToken()

        return fetch('/verifyJWT', {
            method: 'POST',
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({ token: token })
        })
        .then(res => {
            if (!res.ok)
                throw new Error(`${res.status} - ${res.statusText}`)
            return res.json()
        })
        .then(data => data.token)
        .catch(error => {
            navigate(`/Error/${error}`)
            return null
        })
    }

    return verifyToken
}

export { useUserInfo, useTokenVerification}