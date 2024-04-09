import { ChangeEvent, useState } from "react"
import { Link, json, useNavigate } from "react-router-dom"
import { SignupInput } from "common-medium222";

import axios from "axios";
import { BACKEND_URL } from "../config.ts"

export const Auth = ({type} : {type : "signup" | "signin"}) => {

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name : "",
        username : "",
        password : ""
    });

    async function sendRequest() {
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs);
            const jwt = response.data;
            console.log(response.data);
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        }
        catch(e) {
            console.log(e);
            alert("Error while logging in")
        }
    }
    
    return <div className="h-screen flex justify-center flex-col">
        {JSON.stringify(postInputs)}
        <div className="flex justify-center">
            <div>
                <div>
                    <div className="text=3xl font-bold ">
                        Create an account
                    </div>
                    <div>
                        { type === "signup" ? "Already have an account?" : "Dont have an account?"} 
                        <Link className="pl-2 underline" to={  type === "signup" ? "/signin" : "/signup"}>
                             {type === "signup" ? "Login" : "Signup"} </Link>
                    </div>
                </div>
                <div className="pt-6">
                    {type === "signup" ? <LabelledInput label = "Name" placeholder="Aasif Ali..." onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name : e.target.value
                        }))
                    }}></LabelledInput> : null}
                    <LabelledInput label = "Username" placeholder="aasif@gmail.com" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username : e.target.value
                        }))
                    }}></LabelledInput>
                    <LabelledInput label = "Password" placeholder="123456" onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password : e.target.value
                        }))
                    }}></LabelledInput>
                </div>
                <div className="pt-6 flex justify-center">
                <button onClick = {sendRequest} type="button" className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none
                 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 
                 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{type === "signin" ? "signin" : "signup" }</button>

                </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label : string;
    placeholder : string;
    onChange : (e : ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput( { label , placeholder , onChange } : LabelledInputType) {
    return <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input  onChange = {onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 
        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
        dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div> 
}