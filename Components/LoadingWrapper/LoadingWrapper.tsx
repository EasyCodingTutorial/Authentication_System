import React from 'react'

import styles from './LoadingWrapper.module.css'

const LoadingWrapper = (
    { children }: { children: React.ReactNode }
) => {
    return (
        <div className={styles.LoadingWrapper}>
            <div></div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default LoadingWrapper