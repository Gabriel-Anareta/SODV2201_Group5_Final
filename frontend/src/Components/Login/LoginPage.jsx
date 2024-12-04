import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserInfo } from "../../CustomHooks/UserHooks"

export const LoginPage = () => {
    const [login, setLogin, submitLogin] = useUserInfo('login')
    const navigate = useNavigate()

    const HandleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        if (!(login.username && login.password))
            return;

        submitLogin()
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