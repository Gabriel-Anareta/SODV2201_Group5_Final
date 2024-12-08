import { useEffect } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"
import { useAllBooks } from "../../ServerHooks/BookHooks"
import { NavBar } from "./NavBar"
import { useTokenVerification } from "../../ServerHooks/UserHooks"
import styles from "./Home.module.css"
import { FooterInfo } from "../Footer/FooterInfo"

export const Home = () => {
    const books = useAllBooks()
    const navigate = useNavigate()
    const verifyToken = useTokenVerification()
    const username = localStorage.getItem('username')

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })
    }, [])

    return (
        <div className={styles.Home}>
            <div className={styles.Opener}></div>
            <header>
                <NavBar username={username}/>
                <div className={styles.TitleOuter}>
                    <div className={styles.TitleInner}>
                        <h1>Stories Made for Everyone</h1>
                    </div>
                </div>
            </header>
            <main>
                <section className={styles.BreakSection}>
                    <div className={styles.QuoteContainer}>
                        <div className={styles.TextBlock}>
                            <p>
                                “I am so impressed again with the life-giving
                                <span className={styles.HighlightDark}> power of literature </span>
                                . . .”
                            </p>
                            <p>
                                “. . . If I were a young person today, 
                                <span className={styles.HighlightDark}> trying to gain a sense of myself in the world</span>
                                , I would do that again by reading, just as I did when I was young.”
                            </p>
                            <p>~ Maya Angelou</p>
                        </div>
                        <button onClick={() => navigate('/Books')}>Find a book for you →</button>
                    </div>
                </section>
                <section>
                    <h2 className={styles.BooksTitle}>Check out some popular books</h2>
                    <div className={styles.AllBooks}>
                        {books
                        .filter(book => book.id < 5)
                        .map(book => {
                            return(
                                <BookDisplay key={book.id} data={book} />
                            )
                        })}
                    </div>
                </section>
                <section>
                    <div className={styles.BreakSection}>
                        <p>Looking for a specific book?</p>
                        <button onClick={() => navigate('/Books/Search')}>Check here to see if we have it!</button>
                    </div>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}