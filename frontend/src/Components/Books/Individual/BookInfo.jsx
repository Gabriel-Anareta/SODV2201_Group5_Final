import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { useGetBook } from "../../../ServerHooks/BookHooks";
import { useTokenVerification } from "../../../ServerHooks/UserHooks";
import { FooterInfo } from "../../Footer/FooterInfo";
import { NavBar } from "./NavBar";
import styles from "./BookInfo.module.css"

export const BookInfo = () => {
    const { id } = useParams()
    const book = useGetBook(id)
    const navigate = useNavigate()
    const verifyToken = useTokenVerification()
    const username = localStorage.getItem('username')

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })
    }, [])

    return (
        <div className={styles.FullDisplay}>
            <header>
                <NavBar />
                <div className={styles.TitleOuter}>
                    <div className={styles.TitleInner}>
                        <h1>Book Info</h1>
                    </div>
                </div>
                <div className={styles.Divider}></div>
            </header>
            <main>
                <section className={styles.BookDisplay}>
                    <img src={book.coverImage} alt={book.title} />
                    <div className={styles.BookInfo}>
                        <div>
                            <h2>{book.title}</h2>
                            <h3>~ {book.author}</h3>
                        </div>
                        <div className={styles.BookSubInfo}>
                            <h4>Description:</h4>
                            <p>{book.description}</p>
                        </div>
                        <div className={styles.BookSubInfo}>
                            <h4>Publication Date:</h4>
                            <p>{book.publicationDate}</p>
                        </div>
                        {username === "admin" ?
                        <div className={styles.BookMod}>
                            <button type="button" onClick={() => navigate(`/Books/Edit/${book.id}`)}>Edit</button>
                            <button type="button" onClick={() => navigate(`/Books/Delete/${book.id}`)}>Delete</button>
                        </div>
                        : <></>}
                    </div>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}