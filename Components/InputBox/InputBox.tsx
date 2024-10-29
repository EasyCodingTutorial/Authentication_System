import React from 'react'

import styles from './InputBox.module.css'

interface InputBoxProps {
    labelText: string,
    Id: string,
    InputType: string,
    value: string,
    fieldValidation?: string,
    disabaled?: boolean,
    onchange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputBox = (
    {
        labelText,
        Id,
        InputType,
        value,
        fieldValidation,
        disabaled,
        onchange
    }: InputBoxProps
) => {
    return (
        <div className={styles.InputBox}>
            <label htmlFor={Id}>{labelText}</label>
            {fieldValidation && (
                <span className={styles.ErrorMessage}>{fieldValidation}</span>
            )}
            <br />
            <input
                type={InputType}
                id={Id}
                className={fieldValidation ? styles.InputError : ''}
                disabled={disabaled}
                value={value}
                onChange={onchange}

            />
        </div>
    )
}
