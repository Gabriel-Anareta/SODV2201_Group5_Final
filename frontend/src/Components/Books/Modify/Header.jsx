import { NavBar } from "./NavBar"
import styles from "./Modifier.module.css"

export const Header = ({ username, children }) => {
    return (
        <div className={styles.FullHeader}>
            <NavBar username={username}/>
            <div className={styles.TitleOuter}>
                <div className={styles.TitleInner}>
                    <h1>{ children }</h1>
                </div>
            </div>
            <div className={styles.Divider}></div>
        </div>
    )
}