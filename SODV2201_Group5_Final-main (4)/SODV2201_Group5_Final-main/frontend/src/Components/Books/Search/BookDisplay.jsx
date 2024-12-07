import { useEffect, useState } from "react"
import styles from "./Search.module.css"
import { useNavigate } from "react-router-dom"

export const BookDisplay = ({data}) => {
    const [book, setBook] = useState(data)
    const navigate = useNavigate()

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
            </div>
        </div>
    )
}