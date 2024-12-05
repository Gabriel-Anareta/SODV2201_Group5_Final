import { useNavigate } from "react-router-dom"

export const NavBar = () => {
const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate('/Books')}>All Books</button>
            <button onClick={() => navigate('/Books/Search')}>Search</button>
            <button onClick={() => {
                localStorage.clear()
                navigate('/Login')
            }}>Logout</button>
        </div>
    )
}