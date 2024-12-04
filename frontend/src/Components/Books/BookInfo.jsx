import { useParams, Link, useNavigate } from "react-router-dom"
import { useGetBook } from "../../ServerHooks/BookHooks"
import "./BookInfo.css";

export const BookInfo = () => {
    const { id } = useParams()
    const book = useGetBook(id)
    const navigate = useNavigate();

    return (
        <div className="container">
            <img src={book.coverImage} alt={book.title}></img>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p className="description">{book.description}</p>
            <p>Date Published: {book.publicationDate}</p>
            <Link to="/Books"><button>To all books</button></Link>
            <main>
                <footer>Copyright &copy;</footer>
            </main>
        </div>
    )
}