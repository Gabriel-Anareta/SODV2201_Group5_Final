import { useEffect } from "react";
import { useAllBooks } from "../../../ServerHooks/BookHooks";
import { useFilter, filterContext } from "./SearchHooks";
import { NavBar } from "./NavBar";
import { SimpleSearch } from "./SimpleSearch";
import { AdvancedSearch } from "./AdvancedSearch";
import { BookDisplay } from "./BookDisplay";
import { FooterInfo } from "../../Footer/FooterInfo";
import styles from "./Search.module.css"
import { useTokenVerification } from "../../../ServerHooks/UserHooks";
import { useNavigate } from "react-router-dom";

export const SearchBooks = () => {
    const [search, setSearch, filter, dispatch] = useFilter()
    const allBooks = useAllBooks()
    const verifyToken = useTokenVerification()
    const navigate = useNavigate()

    useEffect(() => {
        verifyToken(error => {
            navigate(`/Login`)
        })
    }, [])

    const RunFilter = (book) => {
        return (
            filter.author ? book.author.includes(filter.author) : true
            && filter.title ? book.title.includes(filter.title) : true
            && filter.publicationDate ? book.publicationDate.includes(filter.publicationDate) : true
        )
    }

    return (
        <div className={styles.FullSearch}>
            <header>
                <NavBar/>
                <div className={styles.TitleOuter}>
                    <div className={styles.TitleInner}>
                        <h1>Search the Catalogue</h1>
                    </div>
                </div>
                <div className={styles.Divider}></div>
            </header>
            <main>
                <section>
                    <filterContext.Provider value={{ setSearch, filter, dispatch }}>
                        { search === 'simple' ? <SimpleSearch /> : <AdvancedSearch />}
                    </filterContext.Provider>
                </section>
                <section className={styles.Results}>
                    <h2>Results</h2>
                    <div className={styles.ResultGrid}>
                        {allBooks
                        .filter(book => RunFilter(book))
                        .map(book => <BookDisplay key={book.id} data={book}/>)}
                    </div>
                    <h2>End of Results</h2>
                </section>
            </main>
            <footer>
                <FooterInfo />
            </footer>
        </div>
    )
}