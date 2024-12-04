import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetBook } from "../../CustomHooks/BookHooks"

export const BookInfo = () => {
    const { id } = useParams()
    const book = useGetBook(id)
    const navigate = useNavigate();

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