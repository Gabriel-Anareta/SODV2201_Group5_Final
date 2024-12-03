import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const [login, setLogin] = useState({})
    const navigate = useNavigate()

    const HandleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()

        if (!(user.username && user.password))
            return;

        fetch('/login', {
            method: 'POST',
            headers: {
                "Content-Type": "Application/JSON",
            },
            body: JSON.stringify(login)
        })
        .then(res => res.json())
        .then(token => {
            localStorage.setItem('accessToken', token)
            navigate('/Home')
        })
        .catch(error => {
            console.log(error)
        })
    }

    const SignUp = () => {
        navigate('/Signup')
    }

    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={HandleChange}/>
                <label htmlFor="password">Password</label>
                <input type="text" name="password" onChange={HandleChange}/>
                <button type="submit">Login</button>
            </form>
            <button onClick={SignUp}>Sign up</button>
        </div>
    )
}