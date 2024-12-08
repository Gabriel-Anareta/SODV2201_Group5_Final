import { useNavigate } from "react-router-dom"
import { useCreateBook } from "../../../../ServerHooks/BookHooks"
import { useTokenVerification } from "../../../../ServerHooks/UserHooks"
import { useEffect, useState } from "react"
import { FooterInfo } from "../../../Footer/FooterInfo"
import { Header } from "../Header"
import styles from "../Modifier.module.css"

export const AddBook = () => {
    const [book, dispatchBook, submitBook] = useCreateBook()
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
        }
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

    const HandleSubmit = (e) => {
        e.preventDefault()

        for (const prop in book) {
            if (prop === "coverImage")
                continue
            if (book[prop].trim === "")
                return
        }

        submitBook()
        navigate('/Books')
    }

    return (
        <div className={styles.FullModifier}>
            <header>
                <Header username={username}>Create a new Book</Header>
            </header>
            <main className={styles.BookFull}>
                <section className={styles.BookBox}>
                    <h1>Create</h1>
                    <form onSubmit={HandleSubmit} className={styles.BookForm}>
                        <input type="text" name="title" onChange={HandleChange} placeholder="Title" required/>
                        <input type="text" name="author" onChange={HandleChange} placeholder="Author" required/>
                        <input type="text" name="description" onChange={HandleChange} placeholder="Description" required/>
                        <input type="text" name="publicationDate" onChange={HandleChange} placeholder="Publication Date" required/>
                        <input type="text" name="coverImage" onChange={HandleChange} placeholder="Cover Image"/>
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