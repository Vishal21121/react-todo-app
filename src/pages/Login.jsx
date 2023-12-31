import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { account } from '../appwrite/appwriteConfig'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
const Login = () => {
    const { setUserData, setError, userData, err } = useContext(UserContext)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        let email = e.target[0].value
        let password = e.target[1].value
        try {
            const response = await account.createEmailSession(email, password);
            console.log(response);
            setUserData(response)
            localStorage.setItem("user-info",JSON.stringify(response))
            navigate("/")
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }
    return (
        <>
            <div>
                <div className="bg-[#274a6b] h-screen py-20">
                    <div className="w-4/12 mx-auto bg-gray800">
                        <h1 className="font-bold text-4xl text-center text-white">
                            Sign in to your account
                        </h1>
                        <form
                            className="my-12 mx-auto w-full bg-gray-950 rounded-lg py-6 h-max"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-3/4 mx-auto my-2">
                                <p className="font-medium text-white">Email address</p>
                                <input
                                    type="email"
                                    name="email"
                                    className="border-2 w-full rounded-md border-gray-400 h-9 outline-none pl-2"
                                />
                            </div>
                            <div className="w-3/4 mx-auto mt-4">
                                <p className="font-medium text-white">Password</p>
                                <input
                                    type="password"
                                    name="Password"
                                    className="border-2 w-full rounded-md border-gray-400 h-9 outline-none pl-2"
                                />
                            </div>
                            <button className="bg-gray-900 w-3/4 ml-16 mt-4 p-2 rounded-lg text-white hover:bg-gray-800 text-xl font-bold">
                                Sign in
                            </button>
                            <p className="w-3/4 ml-16 mt-4 text-center font-semibold text-lg text-white">
                                OR
                            </p>
                            <p className="text-white text-center">
                                Don't have an account?
                                <Link className="text-blue-500 ml-1" to="/signup">
                                    Signup
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login