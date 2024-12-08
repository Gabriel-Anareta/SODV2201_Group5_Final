import { useNavigate, useParams } from "react-router-dom"
import { useGetBook, useUpdateBook } from "../../../../ServerHooks/BookHooks"
import { useTokenVerification } from "../../../../ServerHooks/UserHooks"
import { useEffect, useState } from "react"
import { FooterInfo } from "../../../Footer/FooterInfo"
import { Header } from "../Header"
import styles from "../Modifier.module.css"

export const EditBook = () => {
    const { id } = useParams()
    const [book, dispatchBook, submitBook] = useUpdateBook(id)
    const getBook = useGetBook(id)
    const [username, setUsername] = useState("")
    const verifyToken = useTokenVerification()
    const navigate = useNavigate()

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })

        try {
            const name = localStorage.getItem('username')
            if (name !== "admin")
                throw new Error("403 - Access denied")
            setUsername(name)
        }
        catch (error) {
            navigate(`/Error/${error}`)
            return
        }

        dispatchBook({
            type: "SetBook",
            value: getBook
        })
    }, [])

    const HandleChange = (e) => {
        dispatchBook({
            type: "SetBookValue",
            field: e.target.name,
            value: e.target.value
        })
    }

    const HandleReset = () => {
        dispatchBook({ type: "ResetBook" })
    }

    const HandleSubmit = () => {
        for (const prop in book) {
            if (prop === "coverImage")
                continue
            if (book[prop].trim === "")
                return
        }

        submitBook()
    }

    return (
        <div className={styles.FullModifier}>
            <header>
                <Header username={username}>Edit this Book</Header>
            </header>
            <main className={styles.BookFull}>
                <section className={styles.BookBox}>
                    <form onSubmit={HandleSubmit} className={styles.BookForm}>
                        <input type="text" name="title" onChange={HandleChange} placeholder="Title" value={book.title}required/>
                        <input type="text" name="author" onChange={HandleChange} placeholder="Author" value={book.author}required/>
                        <input type="text" name="description" onChange={HandleChange} placeholder="Description" value={book.description}required/>
                        <input type="text" name="publicationDate" onChange={HandleChange} placeholder="Publication Date" value={book.publicationDate}required/>
                        <input type="text" name="coverImage" onChange={HandleChange} placeholder="Cover Image" value={book.coverImage}/>
                        <div className={styles.BookButtons}>
                            <button type="button" onClick={HandleReset} className={styles.Reset}>Reset</button>
                            <button type="submit" className={styles.Submit}>Submit</button>
                        </div>
                    </form>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}