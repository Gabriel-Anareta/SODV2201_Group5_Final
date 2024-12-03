import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const BookDisplay = ({data}) => {
    const [book, setBook] = useState(data)

    useEffect(() => {
        setBook(data)
    }, [data])

    return (
        <>
            <img src={book.coverImage} alt={book.title}></img>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <Link to={`/Books/${book.id}`}>See more about this book</Link>
        </>
    )
}