import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const SignupPage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const HandleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if (!(user.username && user.password))
            return;

        fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/JSON"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(token => {
            localStorage.setItem('accessToken', token)
            navigate('/Home')
        })
        .catch(error => navigate(`/Error/${error}`))
    }

    return (
        <form onSubmit={HandleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" onChange={HandleChange}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" onChange={HandleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}