import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUserInfo } from "../../ServerHooks/UserHooks"

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

    return (
        <form onSubmit={HandleSubmit}>
            <label htmlFor="Signupname">Signupname</label>
            <input type="text" name="Signupname" onChange={HandleChange}/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password" onChange={HandleChange}/>
            <button type="submit">Submit</button>
        </form>
    )
}