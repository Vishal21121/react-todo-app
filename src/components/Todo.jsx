import React, { useState } from 'react'
import { databases } from '../appwrite/appwriteConfig'

const Todo = ({ $id,userData,fetchTodo }) => {

    const [isUpdate, setIsUpdate] = useState(false)
    const [data, setData] = useState("")

    const handleDelete = async(e)=>{
        try{
            const res = await databases.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID,e.target.parentElement.id)
            fetchTodo()
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async(e)=>{
        try {
            console.log(data);
            const response = await databases.updateDocument(import.meta.env.VITE_DATABASE_ID,import.meta.env.VITE_COLLECTION_ID,e.target.parentElement.id,{data})
            console.log(response);
            setIsUpdate(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div
                className="w-[80%] bg-gray-900 p-2 my-4 rounded-3xl flex justify-center focus:border-5 border-5 border-red-800 " id={$id}>
                <div className="w-full">
                    <p className="bg-gray-900  w-11/12 text-gray-400 h-8 overflow-y-auto border-none focus:outline-none pl-4 align-middle pt-0.5" id="${todoId}" contentEditable={isUpdate ? true : false} onInput={(e)=>setData(e.target.textContent)}>{userData}</p>
                </div>
                <button
                    className="text-gray-400 outline outline-blue-700 rounded-xl py-0.5 font-semibold px-4  hover:bg-blue-700 hover:text-white mt-1 mr-4 hover:outline-none" onClick={()=>setIsUpdate(true)}>EDIT 
                </button>
                {
                    isUpdate && <button
                    className="text-gray-400 outline outline-orange-700 rounded-xl pb-0.5 font-semibold px-4  hover:bg-orange-700 hover:text-white mt-1 mr-4 hover:outline-none" onClick={handleSubmit}>SAVE 
                </button>
                }
                <button
                    className="text-gray-400 outline outline-red-700 rounded-xl py-0.5 font-semibold px-4  hover:bg-red-700 hover:text-white mt-1 mr-4 hover:outline-none" onClick={handleDelete} >DELETE
                </button>
            </div>
        </>
    )
}

export default Todo