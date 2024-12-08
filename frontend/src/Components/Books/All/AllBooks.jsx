import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTokenVerification } from "../../../ServerHooks/UserHooks"
import { useAllBooks } from "../../../ServerHooks/BookHooks"
import { NavBar } from "./NavBar"
import { FooterInfo } from "../../Footer/FooterInfo"
import styles from "./AllBooks.module.css"
import { BookDisplay } from "./BookDisplay"

export const AllBooks = () => {
    const allBooks = useAllBooks()
    const navigate = useNavigate()
    const verifyToken = useTokenVerification()

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })
    }, [])

    return (
        <div className={styles.FullDisplay}>
            <header>
                <NavBar/>
                <div className={styles.TitleOuter}>
                    <div className={styles.TitleInner}>
                        <h1>All Books</h1>
                    </div>
                </div>
                <div className={styles.Divider}></div>
            </header>
            <main>
                <section className={styles.Results}>
                    <h2>All Books</h2>
                    <div className={styles.ResultGrid}>
                        {allBooks.map(book => <BookDisplay key={book.id} data={book}/>)}
                    </div>
                    <h2>End of Results</h2>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}