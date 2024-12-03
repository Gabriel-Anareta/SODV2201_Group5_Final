import { useParams } from "react-router-dom"

export const ErrorPage = () => {
    const { message } = useParams()

    return(
        <div>
            <h2>Oh no - Something went wrong!</h2>
            <p>{message}</p>
        </div>
    )
}