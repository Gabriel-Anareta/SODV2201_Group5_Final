import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

export const BookInfo = () => {
    const [book, setBook] = useState({})
    const { id } = useParams()
    const navigate = useNavigate();

    const GetBook = async () => {
        fetch(`/books/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "Application/JSON"
            }
        })
        .then(res => res.json())
        .then(data => setBook(data))
        .catch(error => navigate(`/Error/${error}`))
    }

    useEffect(() => {
        GetBook()
    }, [])

    return (
        <div>
            <img src={book.coverImage} alt={book.title}></img>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.description}</p>
            <p>{book.publicationDate}</p>
            <Link to="/Books">To all books</Link>
        </div>
    )
}