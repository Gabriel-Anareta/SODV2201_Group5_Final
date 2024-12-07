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

    const GetData = async (res) => {
        const data = await res.json()
        if (!res.ok){
            throw new Error(`${data.message}`)
        }
        return data
    }

    const submitUser = async () => {
        fetch(`/${callType}`, {
            method: 'POST',
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify(user)
        })
        .then(res => GetData(res))
        .then(data => {
            localStorage.setItem('accessToken', data.token)
            localStorage.setItem('username', data.username)
            navigate('/Home')
        })
        .catch(error => navigate(`/Error/${error}`))
    }

    return [user, setUser, submitUser]
}

const GetToken = (onError = (error) => {}) => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
        onError(new Error('token does not exist'))
        return null
    }
    return token
}

const useTokenVerification = () => {
    const verifyToken = async (onError = (error) => {}) => {

        const token = GetToken(onError)

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
            onError(error)
            return null
        })
    }

    return verifyToken
}

export { useUserInfo, useTokenVerification, GetToken}