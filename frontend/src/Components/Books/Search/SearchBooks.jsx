import { useDebugValue, useReducer } from "react";
import { useAllBooks } from "../../../ServerHooks/BookHooks";
import { useFilter, filterContext } from "./SearchHooks";
import { SimpleSearch } from "./SimpleSearch";
import { AdvancedSearch } from "./AdvancedSearch";

export const SearchBooks = () => {
    const [search, setSearch, filter, dispatch] = useFilter()

    const allBooks = useAllBooks()

    const RunFilter = (book) => {
        return (
            filter.author ? book.author.includes(filter.author) : true
            && filter.title ? book.title.includes(filter.title) : true
            && filter.publicationDate ? book.publicationDate.includes(filter.publicationDate) : true
        )
    }

    return (
        <div>
            <filterContext.Provider value={{ setSearch, filter, dispatch }}>
                { search === 'simple' ? <SimpleSearch /> : <AdvancedSearch />}
            </filterContext.Provider>
            <section>
                {allBooks
                .filter(book => RunFilter(book))
                .map(book => 
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