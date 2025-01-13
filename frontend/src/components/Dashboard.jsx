import React from "react"
import { useSelector } from "react-redux"

const Dashboard = () => {
    const {user} = useSelector((state) => state.auth);

    return (
        <div>
        <h2>DASHBOARD</h2>
        {
            user ? <p>Welcome , {user.username} !!!</p> :
            <p>Please login to view content</p>
        }
        </div>
    )
}

export default Dashboard;