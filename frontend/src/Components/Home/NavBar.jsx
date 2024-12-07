import { useNavigate } from "react-router-dom"
import styles from './Home.module.css'

export const NavBar = ({ username }) => {
    const navigate = useNavigate()

    return (
        <div className={styles.NavContainer}>
            <p>Welcome {username}!</p>
            <div className={styles.NavButtons}>
                <button onClick={() => navigate('/Books')}>All Books</button>
                <button onClick={() => navigate('/Books/Search')}>Search</button>
                <button onClick={() => {
                    localStorage.clear()
                    navigate('/Login')
                }}>Logout</button>
            </div>
        </div>
    )
}