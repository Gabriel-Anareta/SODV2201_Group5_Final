import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserInfo } from "../../ServerHooks/UserHooks"
import styles from "./LogSign.module.css"

export const SignupPage = () => {
    const [signup, setSignup, submitSignup] = useUserInfo('signup')
    const navigate = useNavigate()

    const HandleChange = (e) => { 
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    const HandleSubmit = async (e) => {
        e.preventDefault()
        if (!(signup.username && signup.password))
            return;

        submitSignup()
    }

    const Login = () => {
        navigate('/Login')
    }

    return (
        <div>
            <main className={styles.UserFull}>
                <section className={styles.UserBox}>
                    <h1>Signup</h1>
                    <form onSubmit={HandleSubmit} className={styles.UserForm}>
                        <input type="text" name="username" onChange={HandleChange} placeholder="username"/>
                        <input type="text" name="password" onChange={HandleChange} placeholder="password"/>
                        <div className={styles.UserButtons}>
                            <button onClick={Login} className={styles.Reroute}>Already have an account?</button>
                            <button type="submit" className={styles.Submit}>Signup</button>
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