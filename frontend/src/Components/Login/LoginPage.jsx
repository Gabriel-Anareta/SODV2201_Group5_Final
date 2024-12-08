import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GetToken, useTokenVerification, useUserInfo } from "../../ServerHooks/UserHooks"
import { FooterInfo } from "../Footer/FooterInfo"
import styles from "./LogSign.module.css"

export const LoginPage = () => {
    const [login, setLogin, submitLogin] = useUserInfo('login')
    const verifyToken = useTokenVerification()
    const navigate = useNavigate()

    useEffect(() => {
        const token = GetToken()
        if (!token)
            return

        var valid = true
        const verified = verifyToken(error => {
            localStorage.clear()
            valid = false
        })
        if (verified && valid)
            navigate('/Home')
    }, [])

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
            <div className={styles.Opener}></div>
            <main className={styles.UserFull}>
                <section className={styles.UserBox}>
                    <h1>Login</h1>
                    <form onSubmit={HandleSubmit} className={styles.UserForm}>
                        <input type="text" name="username" onChange={HandleChange} placeholder="username"/>
                        <input type="text" name="password" onChange={HandleChange} placeholder="password"/>
                        <div className={styles.UserButtons}>
                            <button onClick={SignUp} className={styles.Reroute}>Don't have an account?</button>
                            <button type="submit" className={styles.Submit}>Login</button>
                        </div>
                    </form>
                </section>
            </main>
            <footer>
                <p className={styles.Copyright}>Copyright &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}