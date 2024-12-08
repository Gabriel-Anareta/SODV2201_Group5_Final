import { useNavigate, useParams } from "react-router-dom"
import styles from "./Error.module.css"

export const ErrorPage = () => {
    const { message } = useParams()
    const navigate = useNavigate()

    return(
        <div>
            <main>
                <section className={styles.ErrorFull}>
                    <h1 className={styles.Title}>Sorry, Looks like something went wrong !</h1>
                    <div className={styles.ErrorMessage}>
                        <h2>Error Message</h2>
                        <p>{message}</p>
                        <button type="button" onClick={() => navigate('/Home')}>Go Home</button>
                    </div>
                </section>
            </main>
            <footer>
                <p className={styles.Copyright}>Copyright &copy; {new Date().getFullYear()}</p>
            </footer>
        </div>
    )
}