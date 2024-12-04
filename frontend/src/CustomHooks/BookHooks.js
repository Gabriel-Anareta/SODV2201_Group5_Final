import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const BaseRoute = '/books'

const useAllBooks = () => {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    const GetBooks = async () => {
        fetch(BaseRoute, {
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

const useGetBook = (id) => {
    const [book, setBook] = useState({
        id: 0,
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: "",
    })
    const navigate = useNavigate();

    const GetBook = async () => {
        fetch(`${BaseRoute}/${id}`, {
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

const useCreateBook = () => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: "",
    })
    const navigate = useNavigate();

    const submitBook = async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            const msg = "401 - unauthorized"
            navigate(`/Error/${msg}`)
            return
        }

        fetch(BaseRoute, {
            method: 'POST',
            headers: { 
                "Content-Type": "Application/JSON",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => navigate(`/Books/${data.id}`))
        .catch(error => navigate(`/Error/${error}`))
    }

    return [book, setBook, submitBook]
}

const useUpdateBook = (id) => {
    const [book, setBook] = useState({
        title: "",
        author: "",
        description: "",
        publicationDate: "",
        coverImage: "",
    })
    const navigate = useNavigate();

    const submitBook = async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            const msg = "401 - unauthorized"
            navigate(`/Error/${msg}`)
            return
        }

        fetch(`${BaseRoute}/${id}`, {
            method: 'PUT',
            headers: { 
                "Content-Type": "Application/JSON",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(book)
        })
        .then(res => res.json())
        .then(data => navigate(`/Books/${data.id}`))
        .catch(error => navigate(`/Error/${error}`))
    }

    return [book, setBook, submitBook]
}

const useDeleteBook = () => {
    const navigate = useNavigate();

    const submitID = async (id) => {
        const token = localStorage.getItem('accessToken')
        if (!token) {
            const msg = "401 - unauthorized"
            navigate(`/Error/${msg}`)
            return
        }

        fetch(`${BaseRoute}/${id}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "Application/JSON",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => navigate(`/Books`))
        .catch(error => navigate(`/Error/${error}`))
    }

    return submitID
}

export { useAllBooks, useGetBook, useCreateBook, useUpdateBook, useDeleteBook }