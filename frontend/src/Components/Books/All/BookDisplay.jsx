import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./AllBooks.module.css"

export const BookDisplay = ({data}) => {
    const [book, setBook] = useState(data)
    const navigate = useNavigate()
    const username = localStorage.getItem('username')

    useEffect(() => {
        setBook(data)
    }, [])

    return (
        <div className={styles.BookDisplay}>
            <img src={book.coverImage} alt={book.title} />
            <div className={styles.BookInfo}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button onClick={() => navigate(`/Books/${book.id}`)}>View this book</button>
                {username === "admin" ?
                <div className={styles.BookMod}>
                    <button type="button" onClick={() => navigate(`/Books/Edit/${book.id}`)}>Edit</button>
                    <button type="button" onClick={() => navigate(`/Books/Delete/${book.id}`)}>Delete</button>
                </div>
                : <></>}
            </div>
        </div>
    )
}