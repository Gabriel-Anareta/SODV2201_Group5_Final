import { useContext, useState } from "react"
import { filterContext } from "./SearchHooks"

export const SimpleSearch = () => {
    const [category, setCategory] = useState('title')
    const { setSearch, dispatch } = useContext(filterContext)

    const HandleCategoryChange = (e) => {
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
        <>
            <label htmlFor="filter">Search by: </label>
            <select name="filter" id="filter" onChange={HandleCategoryChange}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="publicationatDate">Date</option>
            </select>
            <input type="text" name="search" onChange={HandleSearchChange}/>
            <button onClick={HandleTypeChange}>Advanced search</button>
        </>
    )
}