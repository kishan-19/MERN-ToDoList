// import React from "react";
import { createContext, useContext, useState } from "react";
import { toast } from 'react-toastify';
export const AuthContext = createContext();

export const Auth = (props) => {

    const listInitial = [];
    const [list, setList] = useState(listInitial);
  const [progress, setProgress] = useState(0);

    // store token in localStorage
    const tokenStoreInLs = (tokenValue) => {
        return localStorage.setItem("token", tokenValue);
    };
    // remove Token in localStorage
    const logoutUser = () => {
        toast.info("Logout Successfully");
        return localStorage.removeItem("token");
    };
    // get Token at localStorage
    const getTokenInLS = () => {
        const tokenValu = localStorage.getItem("token")
        return tokenValu;
    }

    //get all user Data
    const getUserData = async () => {
        try {
            setProgress(10);
            const response = await fetch('http://localhost:4000/api/list/fetchUserData', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    "auth-token": getTokenInLS(),
                }
            });
            setProgress(75);
            const responseData = await response.json();
            setList(responseData);
            setProgress(100);
        } catch (e) {
            console.error(e);
        }
    }

    //  add frist one list
    const addList = async (data) => {
        try {
            setProgress(10);
            const response = await fetch("http://localhost:4000/api/list/addlist", {
                method: 'POST',
                headers: {
                    "content-type": 'application/json',
                    "auth-token": getTokenInLS(),
                },
                body: JSON.stringify(data),
            })
            setProgress(60);
            if (response.ok) {
                 await response.json();
                getUserData();
                setProgress(100);
            }
        } catch (error) {
            console.error(error);
        }
    }

    //all more data at list
    const addAnotherOneList = async (data) => {
        try {
            setProgress(10);
            const response = await fetch("http://localhost:4000/api/list/addonelist", {
                method: 'POST',
                headers: {
                    "content-type": 'application/json',
                    "auth-token": getTokenInLS(),
                },
                body: JSON.stringify(data),
            })
            setProgress(75);
            if (response.ok) {
                 await response.json();
                getUserData();
                setProgress(100);
            } else {
                addList(data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    // delete one list item
    const deleteOneListItame = async (id) => {
        try {
            setProgress(10);
            const response = await fetch(`http://localhost:4000/api/list/delete/one/${id}`, {
                method: 'put',
                headers: {
                    "content-type": 'application/json',
                    "auth-token": getTokenInLS(),
                }
            });
            setProgress(75)
            if (response.ok) {
                getUserData();
                setProgress(100);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // delete all list data of use
    const delteAll = async () => {
        try {
            setProgress(15)
            const response = await fetch(`http://localhost:4000/api/list/delete/all`, {
                method: 'delete',
                headers: {
                    "content-type": 'application/json',
                    "auth-token": getTokenInLS(),
                }
            })
            setProgress(60);
            if (response.ok) {
                setProgress(75);
               const responseData= await response.json();
                getUserData();
                toast.warn(responseData.message);
                setProgress(100);
            }else{
                toast.info("not delete all data");
                setProgress(100);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const UpdateList = async (data) => {
        try {
            setProgress(10);
            const response = await fetch(`http://localhost:4000/api/list/update/data/${data.id}`, {
                method: 'put',
                headers: {
                    "content-type": "application/json",
                    "auth-token": getTokenInLS(),
                },
                body: JSON.stringify(data),
            })
            setProgress(75);
            if (response.ok) {
                const responseData = await response.json();
                toast.success(responseData.message);
                getUserData();
                setProgress(100);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthContext.Provider value={{
            tokenStoreInLs, logoutUser, getTokenInLS,
            addAnotherOneList, addList, getUserData,
            list, setList,deleteOneListItame, delteAll,
            UpdateList,
            progress,setProgress
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if (!AuthContextValue) {
        throw new Error('Auth used outside of the Provider');
    }
    return AuthContextValue;
};