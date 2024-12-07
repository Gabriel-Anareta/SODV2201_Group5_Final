import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Home.module.css"

export const BookDisplay = ({data}) => {
    const [book, setBook] = useState(data)
    const navigate = useNavigate()

    useEffect(() => {
        setBook(data)
    }, [data])

    return (
        <div className={styles.BookDisplay}>
            <img src={book.coverImage} alt={book.title}></img>
            <div className={styles.TextBlock}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <button onClick={() => navigate(`/Books/${book.id}`)}>See more about this book</button>
            </div>
        </div>
    )
}