import { useNavigate } from "react-router-dom"
import styles from './Search.module.css'

export const NavBar = ({ username }) => {
    const navigate = useNavigate()
    localStorage.getItem('username')

    return (
        <div className={styles.NavContainer}>
            <p>Bookstore</p>
            <div className={styles.NavButtons}>
                <button onClick={() => navigate('/Home')}>Home</button>
                <button onClick={() => navigate('/Books')}>All Books</button>
                {username === "admin" ?
                <button onClick={() => navigate('/Books/Add')}>Create Book</button>
                : <></>}
                <button onClick={() => {
                    localStorage.clear()
                    navigate('/Login')
                }}>Logout</button>
            </div>
        </div>
    )
}