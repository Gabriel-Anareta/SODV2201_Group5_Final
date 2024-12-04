import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAllBooks } from "../../CustomHooks/BookHooks"
import "./AllBooks.css";

export const AllBooks = () => {
    const allBooks = useAllBooks()

    return (
        <div>
            <header>
                <h1>All Books</h1>
                <div className="search-filter">
                    <input type="text" placeholder="Search books..." />
                    <button>Filter ▼</button>
                </div>
            </header>
            <main>
                <div className="book-grid">
                    {allBooks.map(book => {
                        return(
                            <div className="book-container" key={book.id}>
                                <div className="book-card" key={book.id}>
                                    <img src={book.coverImage} alt={book.title}></img>
                                </div>
                                <div className="book-info">
                                    <h2>{book.title}</h2>
                                    <Link to={`/Books/${book.id}`}><button>View</button></Link>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
            <footer>
                <p>Copyright &copy;</p>
            </footer>
        </div>
    )
}