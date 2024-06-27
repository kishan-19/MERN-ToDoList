import React, { useEffect} from "react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/Auth"
import { toast } from 'react-toastify';


const Admin = () => {
    const { allUserInfo, getAllUserData } = useAuth();
    useEffect(() => {
        getAllUserData()
    });
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/auth/deleteuser/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
            if (response.ok) {
                const responseData = await response.json();
                toast.info(responseData.msg);
            } else {
                const responseData = await response.json();
                toast.info(responseData.msg);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <div className="container">
                <h1 className="admin_page_heading">Admin Page</h1>
                <div className="admin_nav">
                    <ul className="list-group list-group-horizontal">
                        <span><i className="fa-solid fa-user"></i></span><li className="list-group-item">User</li>
                        <NavLink to="/" className="navlink_admin"><span><i className="fa-solid fa-house"></i></span><li className="list-group-item">Home</li></NavLink>
                    </ul>
                </div>
                <div className="user_table mt-3">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">User Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Singup Date</th>
                                <th scope="col">Delete User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUserInfo.map((elem) => {
                                return (
                                    <tr key={elem._id}>
                                        <td>{elem.username}</td>
                                        <td>{elem.email}</td>
                                        <td>{elem.phone}</td>
                                        <td>{elem.date}</td>
                                        <td><button type="button" className="btn btn-outline-danger" onClick={() => deleteUser(elem._id)}>Delete</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Admin