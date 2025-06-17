import React from 'react'
import { IoIosSearch } from "react-icons/io";
import styles from './Header.module.css'

const Header = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.headertitle}>
                        Good Evening
                    </h1>
                    <p className={styles.subtitle}>place your order here</p>
                </div>
                <div className={styles.searchbar}>
                    <input type='text' className={styles.searchinput} placeholder='enter the dish name'></input>
                    <IoIosSearch className={styles.icon}/>
                </div>
            </div>
        </>
    )
}

export default Header