import { useEffect, useState } from "react"
import { BookDisplay } from "./BookDisplay"
import { useNavigate } from "react-router-dom"
import { useAllBooks } from "../../ServerHooks/BookHooks"
import { NavBar } from "./NavBar"
import { useTokenVerification } from "../../ServerHooks/UserHooks"
import styles from "./Home.module.css"

export const Home = () => {
    const books = useAllBooks()
    const navigate = useNavigate()
    const verifyToken = useTokenVerification()
    const username = localStorage.getItem('username')

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Error/${error}`)
        })
    }, [])

    return (
        <div className={styles.Home}>
            <header>
                <div className={styles.Nav}>
                    <NavBar />
                    <div className={styles.Title}>
                        <h1>Welcome {username}!</h1>
                    </div>
                </div>
            </header>
            <main>
                <section>
                    {books.map(book => {
                        return(
                            <BookDisplay key={book.id} data={book} />
                        )
                    })}
                </section>
            </main>
        </div>
    )
}