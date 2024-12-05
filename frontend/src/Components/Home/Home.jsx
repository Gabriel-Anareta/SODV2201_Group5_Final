import { useEffect, useState } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"
import { useAllBooks } from "../../ServerHooks/BookHooks"
import { NavBar } from "./NavBar"
import { useTokenVerification } from "../../ServerHooks/UserHooks"

export const Home = () => {
    const books = useAllBooks()
    const navigate = useNavigate()
    const submitToken = useTokenVerification()
    const username = localStorage.getItem('username')

    useEffect(() => {
        submitToken()
    }, [])

    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>Welcome {username}!</h1>
                <section>
                    {books.map(book => {
                        return(
                            <BookDisplay key={book.id} data={book} />
                        )
                    })}
                </section>
            </main>
        </>
    )
}