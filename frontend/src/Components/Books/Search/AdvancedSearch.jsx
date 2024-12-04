import { useContext } from "react"
import { filterContext } from "./SearchHooks"

export const AdvancedSearch = () => {
    const { setSearch, filter, dispatch } = useContext(filterContext)

    const HandleTypeChange = (e) => {
        dispatch({ type: "resetFilters"})
        setSearch('simple')
    }

    const HandleSearchChange = (e) => {
        dispatch({
            type: "setFilter",
            field: e.target.name,
            value: e.target.value
        })
    }

    return (
        <div>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" value={filter.title} onChange={HandleSearchChange}/>
            <label htmlFor="author">Author: </label>
            <input type="text" name="author" value={filter.author} onChange={HandleSearchChange}/>
            <label htmlFor="publicationDate">Date: </label>
            <input type="text" name="publicationDate" value={filter.publicationDate} onChange={HandleSearchChange}/>
            <button onClick={HandleTypeChange}>Simple Search</button>
        </div>
    )
}