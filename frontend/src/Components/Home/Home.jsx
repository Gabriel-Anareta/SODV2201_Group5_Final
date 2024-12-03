import { useEffect, useState } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    const GetBooks = async () => {
        fetch('/books', {
            method: 'GET',
            headers: {
                "Content-Type": "Application/JSON"
            }
        })
        .then(res => res.json())
        .then(data => setBooks(data.slice(0, 5)))
        .catch(error => navigate(`/Error/${error}`))
    }

    useEffect(() => {
        GetBooks()
    }, [])

    return (
        <div>
            <h1>Welcome!</h1>
            <section>
                {books.map(book => {
                    return(
                        <BookDisplay key={book.id} data={book} />
                    )
                })}
            </section>
        </div>
    )
}