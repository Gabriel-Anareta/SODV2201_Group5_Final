import { createContext, useReducer, useState } from "react";

const filterState = {
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
        case "setSingleFilter":
            return {
                ...filterState,
                [action.field]: action.value
            }
        case "resetFilters":
            return filterState;
    }
}

const filterContext = createContext()

const useFilter = () => {
    const [search, setSearch] = useState('simple')
    const [filter, dispatch] = useReducer(filterReducer, filterState)

    return [search, setSearch, filter, dispatch]
}

export { useFilter, filterContext }