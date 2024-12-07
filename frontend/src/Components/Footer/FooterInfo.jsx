import { useNavigate } from "react-router-dom"
import styles from "./Footer.module.css"

export const FooterInfo = () => {
    const navigate = useNavigate()

    return(
        <div className={styles.FullFooter}>
            <section className={styles.Info}>
                <h2>Links</h2>
                <div className={styles.Links}>
                    <button onClick={() => navigate('/Home')}>Home</button>
                    <button onClick={() => navigate('/Books')}>All Books</button>
                    <button onClick={() => navigate('/Books/Search')}>Search Books</button>
                </div>
            </section>
            <p className={styles.Copyright}>Copyright &copy; {new Date().getFullYear()}</p>
        </div>
    )
}