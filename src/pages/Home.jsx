import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { databases } from '../appwrite/appwriteConfig'
import { Query } from 'appwrite'
import {v4 as uuidv4 } from "uuid"
import Todo from '../components/Todo'

const Home = () => {
    const {userData,setError} = useContext(UserContext)
    const [todo, setTodo] = useState([])
    const [data, setData] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        if(userData.length == 0){
            navigate("/login")
        }
       fetchTodo()
       console.log("todo: ",todo);
    },[])

    const fetchTodo = async()=>{
        const userInfo = JSON.parse(localStorage.getItem("user-info"))
        const response  =  await databases.listDocuments(
            import.meta.env.VITE_DATABASE_ID,
            import.meta.env.VITE_COLLECTION_ID,
            [
                Query.equal("id",[userInfo.$id])
            ]
        )
        console.log(response);
        setTodo(response.documents)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const userInfo = JSON.parse(localStorage.getItem("user-info"))
        // console.log(userInfo);
        try {
            const response = await databases.createDocument(
                import.meta.env.VITE_DATABASE_ID,
                import.meta.env.VITE_COLLECTION_ID,
                uuidv4(),
                {
                    id: userInfo.$id,
                    data
                }
            );
            console.log(response);
            setData("")
            fetchTodo()
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    return (
        <>
            <div className=" h-[100vh] max-w-[100vw] bg-[#274a6b] py-8">
                <div className="bg-gray-950 w-[60%] mx-auto">
                </div>
                <h1 className="text-white pt-8 mb-2 relative left-[30vw] text-4xl font-semibold max-w-max ">
                    Todo List
                </h1>
                <form className="w-2/5 bg-gray-900 mx-auto p-2 my-8 rounded-3xl flex align-middle focus:border-5 border-5 border-red-800 ">
                    <div className="w-full">
                        <input
                            type="text"
                            className="bg-gray-900  w-11/12 text-gray-400 h-8 border-none focus:outline-none pl-4"
                            placeholder="What's your next task?"
                            onChange={(e)=>setData(e.target.value)}
                            value={data}
                        />
                    </div>
                    <button
                        className="text-gray-400 outline outline-violet-700 rounded-xl py-0.5 font-semibold px-4  hover:bg-violet-700 hover:text-white mt-1 mr-4"
                        id="submit"
                        onClick={handleSubmit}
                    >
                        CLOSE
                    </button>
                </form>
                <h1 className="text-white pt-8  relative left-[30vw] text-4xl font-semibold max-w-max">
                    Tasks
                </h1>

                {/* <!-- SAVED TODOS --> */}
                <div className="flex flex-col items-center" id="todoContainer">
                    {todo.map(({ $id,data }) => (
                        <Todo key={$id} $id={$id} userData={data} fetchTodo={fetchTodo}></Todo>
                    ))}
                </div>
            </div>

        </>
    )
}

export default Home