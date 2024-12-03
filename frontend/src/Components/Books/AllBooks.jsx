import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

export const AllBooks = () => {
    const [books, setBooks] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const GetBooks = async () => {
        fetch('/books', {
            method: 'GET',
            headers: {
                "Content-Type": "Application/JSON"
            }
        })
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(error => navigate(`/Error/${error}`))
    }

    useEffect(() => {
        GetBooks()
    }, [])

    return (
        <div>
            <h1>All Books</h1>
            <section>
                {books.map(book => {
                    return(
                        <>
                            <img src={book.coverImage} alt={book.title}></img>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                            <Link to="/Books">To all books</Link>
                        </>
                    )
                })}
            </section>
        </div>
    )
}