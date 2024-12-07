import { useContext, useState } from "react"
import { filterContext } from "./SearchHooks"
import styles from "./Search.module.css"

export const SimpleSearch = () => {
    const [category, setCategory] = useState('title')
    const { setSearch, dispatch } = useContext(filterContext)

    const HandleCategoryChange = (e) => {
        dispatch({ type: 'resetFilters' })
        setCategory(e.target.value)
    }

    const HandleTypeChange = (e) => {
        setSearch('advanced')
    }

    const HandleSearchChange = (e) => {
        dispatch({
            type: "setSingleFilter",
            field: category,
            value: e.target.value
        })
    }

    return (
        <div className={styles.SearchBox}>
            {/* <label htmlFor="filter">Search by: </label> */}
            <div className={styles.InputBox}>
                <select name="filter" id="filter" onChange={HandleCategoryChange}>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="publicationationDate">Date</option>
                </select>
                <input type="text" name="search" onChange={HandleSearchChange} placeholder={category}/>
            </div>
            <button onClick={HandleTypeChange}>Advanced search →</button>
        </div>
    )
}