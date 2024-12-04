import { useEffect, useState } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"
import { useAllBooks } from "../../CustomHooks/BookHooks"

export const Home = () => {
    const books = useAllBooks()
    const navigate = useNavigate()

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