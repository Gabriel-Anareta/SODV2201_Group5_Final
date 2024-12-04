import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useAllBooks = () => {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    const GetBooks = async () => {
        fetch('/books', {
            method: 'GET',
            headers: { "Content-Type": "Application/JSON" }
        })
        .then(res => res.json())
        .then(data => setBooks(data))
        .catch(error => navigate(`/Error/${error}`))
    }

    useEffect(() => {
        GetBooks()
    }, [])

    return books;
}


const useBookFromID = (id) => {
    const [book, setBook] = useState({})
    const navigate = useNavigate();

    const GetBook = async () => {
        fetch(`/books/${id}`, {
            method: 'GET',
            headers: { "Content-Type": "Application/JSON" }
        })
        .then(res => res.json())
        .then(data => setBook(data))
        .catch(error => navigate(`/Error/${error}`))
    }

    useEffect(() => {
        GetBook()
    }, [])

    return book;
}

export { useAllBooks, useBookFromID }