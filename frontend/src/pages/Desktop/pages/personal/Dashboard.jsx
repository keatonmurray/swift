import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import PersonalDashboardSidebar from "../../components/PersonalDashboardSidebar"

const Dashboard = () => {

    return (
        <div className="swift desktop-view homepage m-0 p-0">
            <div className="row m-0">
                <div className="col-12 col-md-2 d-md-block d-none m-0 p-0 min-vh-100 overflow-auto">
                    <PersonalDashboardSidebar />
                </div>
                <div className="col-12 col-md-10 d-block m-0 p-0">
                    
                </div>
            </div>
        </div>
    )
}

export default Dashboard