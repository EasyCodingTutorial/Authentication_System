'use client'
import React, { useEffect, useState } from 'react'

import styles from './AuthForm.module.css'


import { useRouter } from 'next/navigation'

// For Components
import { InputBox } from '@/Components/InputBox/InputBox'
import LoadingWrapper from '../LoadingWrapper/LoadingWrapper'


// NEXT AUTH
import { signIn, useSession } from 'next-auth/react'

export const AuthForm = () => {

    const router = useRouter()

    // For Form Input Fields
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    // For Form Field Validation
    const [fieldValidation, setFieldValidation] = useState<string>('')


    // For Error/Success Messages 
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [successMessage, setSuccessMessage] = useState<string>('')

    // For Varient
    const [varient, setVarient] = useState<'Login' | 'Register'>('Login')

    // For Loading Statue 
    const [loading, setLoading] = useState<boolean>(false)


    const { data: session, status } = useSession()

    // To Switch Varient
    const switchVarient = () => {
        setVarient(varient === 'Login' ? 'Register' : 'Login')
    }


    // For Login
    const LoginNow: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()

        // Small Validation
        if (!email.trim()) {
            setFieldValidation('Email is Required')
            document.getElementById('Email')?.focus()
            return
        } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )) {
            setFieldValidation('Invalid Email Format')
            document.getElementById('Email')?.focus()
            return
        }
        else if (!password.trim()) {
            setFieldValidation('Password is Required')
            document.getElementById('Password')?.focus()
            return
        }
        setFieldValidation("")


        // 
        try {
            setLoading(true)
            const res = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            if (res?.error) {
                console.log(res.error)
                setSuccessMessage("")
                setErrorMessage("Wrong Credentials")
                return
            }

            // If The Credentials are Right
            router.push('/Home')



        } catch (error) {
            setErrorMessage("Something Went Wrong! Try Again")
        } finally {
            setLoading(false)
        }


    }

    // For Register
    const RegisterNow: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()


        // Small Validation
        if (!name.trim()) {
            setFieldValidation('Name is Required')
            document.getElementById('Name')?.focus()
            return
        } else if (!email.trim()) {
            setFieldValidation('Email is Required')
            document.getElementById('Email')?.focus()
            return
        } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        )) {
            setFieldValidation('Invalid Email Format')
            document.getElementById('Email')?.focus()
            return
        }
        else if (!password.trim()) {
            setFieldValidation('Password is Required')
            document.getElementById('Password')?.focus()
            return
        } else if (password.trim().length < 4) {
            setFieldValidation('Password Too Short')
            document.getElementById('Password')?.focus()
            return
        }

        setFieldValidation("")




        // if All Set Then
        try {
            setLoading(true)

            // API REQ TO CHECK WHETHER THE EMAIL ID IS ALREADY EXISTS OR NOT
            const checkUserExists: Response = await fetch('/api/auth/UserExists', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    email
                })
            })

            const { UserCheck } = await checkUserExists.json()
            if (UserCheck) {
                setSuccessMessage('')
                setEmail('')
                setErrorMessage('User Already Exists')
                setFieldValidation('')
                return
            }




            // API Req To Register New user
            const res: Response = await fetch('/api/auth/Register', {
                method: "POST",
                headers: {
                    "Content-type": 'application/json',
                },
                body: JSON.stringify({
                    name, email, password
                })
            })

            if (res.ok) {
                setErrorMessage('')
                setSuccessMessage("Account Created! Login Now")
                setName('')
                setEmail('')
                setPassword('')
                //Switch Varient
                switchVarient()
            } else {
                setErrorMessage('Internal Server Error! Try Again')
            }


        } catch (error) {
            setErrorMessage('Something Went Wrong! Try Again')
        } finally {
            setLoading(false)
        }


    }


    useEffect(() => {

        if (status === 'authenticated') {
            router.push('/Home')
        } else {
            router.push('/')
        }

    }, [status, session, router])


    return (
        <div className={styles.Auth}>
            <form onSubmit={varient === 'Login' ? LoginNow : RegisterNow}>
                <h6>
                    {varient === 'Login' ? 'Login Now' : 'Register  Now'}
                </h6>


                {
                    varient === 'Register' && (
                        <InputBox
                            labelText='Your Name'
                            InputType='name'
                            Id='Name'
                            value={name}
                            onchange={(e) => setName(e.target.value)}
                            fieldValidation={fieldValidation === 'Name is Required' ? fieldValidation : ''}
                        />
                    )
                }



                <InputBox
                    labelText='Your Email'
                    InputType='email'
                    Id='Email'
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                    fieldValidation={fieldValidation === 'Email is Required' || fieldValidation === 'Invalid Email Format' ? fieldValidation : ''}
                />
                <InputBox
                    labelText='Your Password'
                    InputType='password'
                    Id='Password'
                    value={password}
                    fieldValidation={fieldValidation === 'Password is Required' || fieldValidation === 'Password Too Short' ? fieldValidation : ''}
                    onchange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" className={styles.Btn}>
                    {
                        varient === 'Login' ?
                            (
                                loading ? (
                                    <LoadingWrapper>
                                        Log In...
                                    </LoadingWrapper>
                                ) : 'Login Now'
                            ) :
                            (
                                loading ? (
                                    <LoadingWrapper>
                                        Registering...
                                    </LoadingWrapper>
                                ) : 'Register Now'
                            )
                    }
                </button>


                {/* For Custom Messages */}
                <p className={styles.CustomMessage}>

                    {
                        varient === 'Login' ? ' Don‘t have an account?' : 'Already Have An Account?'
                    }


                    <span
                        onClick={switchVarient}
                    >
                        {
                            varient === 'Login' ? 'Register Now' : 'Login Now'
                        }
                    </span>
                </p>


                {/* For Error/Success Messages */}
                {
                    errorMessage && (
                        <p className={styles.ErrorMessage}>
                            {errorMessage}
                        </p>
                    )
                }

                {successMessage && (
                    <p className={styles.SuccessMessage}>
                        {successMessage}
                    </p>
                )}






            </form>
        </div>
    )
}
