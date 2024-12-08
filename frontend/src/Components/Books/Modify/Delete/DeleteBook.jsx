import { useNavigate, useParams } from "react-router-dom"
import { useDeleteBook, useGetBook } from "../../../../ServerHooks/BookHooks"
import { useTokenVerification } from "../../../../ServerHooks/UserHooks"
import { useEffect, useState } from "react"
import { FooterInfo } from "../../../Footer/FooterInfo"
import { Header } from "../Header"
import styles from "../Modifier.module.css"

export const DeleteBook = () => {
    const { id } = useParams()
    const submitID = useDeleteBook(id)
    const book = useGetBook(id)
    const [username, setUsername] = useState("")
    const verifyToken = useTokenVerification()
    const navigate = useNavigate()

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })

        try {
            const name = localStorage.getItem('username')
            if (name !== "admin")
                throw new Error("403 - Access denied")
            setUsername(name)
        }
        catch (error) {
            navigate(`/Error/${error}`)
        }
    }, [])

    return (
        <div className={styles.FullModifier}>
            <header>
                <Header username={username}>Delete this Book</Header>
            </header>
            <main className={styles.BookFull}>
                <section className={styles.BookBox}>
                    <h1>Delete</h1>
                    <h3>Title:</h3>
                    <p>{book.title}</p>
                    <h3>Author:</h3>
                    <p>{book.author}</p>
                    <h3>Description:</h3>
                    <p>{book.description}</p>
                    <h3>Publication Date:</h3>
                    <p>{book.publicationDate}</p>
                    <h3>Image Source:</h3>
                    <p>{book.coverImage}</p>
                    <div className={styles.BookButtons}>
                        <button type="button" onClick={() => navigate('/Books')} className={styles.Reset}>Go Back</button>
                        <button type="button" className={styles.Submit}>Delete</button>
                    </div>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}