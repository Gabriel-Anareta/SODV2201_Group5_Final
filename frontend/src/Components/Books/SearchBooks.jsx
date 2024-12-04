import { useReducer } from "react";
import { useAllBooks } from "../../CustomHooks/BookHooks";

const filter = {
    author: "",
    title: "",
    publicationDate: ""
}

const filterReducer = (state, action) => {
    switch (action.type) {
        case "setFilter":
            return {
                ...state,
                [action.field]: action.value
            }
        case "resetFilter":
            return filter;
    }
}

export const SearchBooks = () => {
    const [filterState, dispatch] = useReducer(filterReducer, filter)

    const allBooks = useAllBooks()

    const HandleChange = (e) => {
        dispatch({
            type: "setFilter",
            field: e.target.name,
            value: e.target.value
        })
    }

    const HandleReset = () => {
        dispatch({ type: "resetFilter" })
    }

    return (
        <div>
            <section>
                {allBooks.map(book => 
                    <>
                        <img src={book.coverImage} alt={book.title}></img>
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.description}</p>
                        <p>{book.publicationDate}</p>
                    </>
                )}
            </section>
        </div>
    )
}