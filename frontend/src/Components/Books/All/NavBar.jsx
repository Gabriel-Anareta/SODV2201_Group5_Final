import { useNavigate } from "react-router-dom"
import styles from './AllBooks.module.css'

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.NavContainer}>
            <p>Bookstore</p>
            <div className={styles.NavButtons}>
                <button onClick={() => navigate('/Home')}>Home</button>
                <button onClick={() => navigate('/Books/Search')}>Search</button>
                <button onClick={() => {
                    localStorage.clear()
                    navigate('/Login')
                }}>Logout</button>
            </div>
        </div>
    )
}