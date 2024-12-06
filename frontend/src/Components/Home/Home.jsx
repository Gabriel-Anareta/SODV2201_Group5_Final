import { useEffect, useState } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"
import { useAllBooks } from "../../ServerHooks/BookHooks"
import { NavBar } from "./NavBar"
import { useTokenVerification } from "../../ServerHooks/UserHooks"
import styles from "./Home.module.css"

export const Home = () => {
    const books = useAllBooks()
    const navigate = useNavigate()
    const verifyToken = useTokenVerification()
    const username = localStorage.getItem('username')

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Error/${error}`)
        })
    }, [])

    return (
        <div className={styles.Home}>
            <header>
                <div className={styles.Nav}>
                    <NavBar />
                </div>
                <div className={styles.Title}>
                    <div className={styles.TitleDarkener}>
                        <h1>Welcome {username}!</h1>
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
                                , would do that again by reading, just as I did when I was young.”
                            </p>
                            <p>~ Maya Angelou</p>
                        </div>
                        <button onClick={() => navigate('/Books')}>Find a book for you →</button>
                    </div>
                </section>
                <section>
                    {/* {books.map(book => {
                        return(
                            <BookDisplay key={book.id} data={book} />
                        )
                    })} */}
                </section>
            </main>
        </div>
    )
}