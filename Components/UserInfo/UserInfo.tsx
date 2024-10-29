"use client"
import React from 'react'

import styles from './UserInfo.module.css'


// NEXT AUTH
import { signOut, useSession } from 'next-auth/react'

export const UserInfo = () => {

    const { data: session, status } = useSession()




    if (status === "loading") {
        <h1>Loading...</h1>
    }

    if (status === 'authenticated') {
        return (
            <div className={styles.Info}>
                <div>
                    <h6>Welcome : <span>{session?.user?.name}</span></h6>
                    <h6>Email : <span>{session?.user?.email}</span></h6>
                    <button className={styles.Btn} onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        )
    }

}
