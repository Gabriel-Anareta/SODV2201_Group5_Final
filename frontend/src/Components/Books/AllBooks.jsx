import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useAllBooks } from "../../CustomHooks/BookHooks"

export const AllBooks = () => {
    const allBooks = useAllBooks()

    return (
        <div>
            <h1>All Books</h1>
            <section>
                {allBooks.map(book => {
                    return(
                        <>
                            <img src={book.coverImage} alt={book.title}></img>
                            <h2>{book.title}</h2>
                            <p>{book.author}</p>
                            <p>{book.description}</p>
                            <Link to={`/Books/${book.id}`}>See more about this book</Link>
                        </>
                    )
                })}
            </section>
        </div>
    )
}