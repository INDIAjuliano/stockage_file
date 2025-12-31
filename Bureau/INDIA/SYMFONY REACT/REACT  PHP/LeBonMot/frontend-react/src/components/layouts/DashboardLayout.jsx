import { Outlet } from "react-router-dom";
import DashboardTopbar from "../shared/dashboard/DashboardTopbar";
import DashboardSidebar from "../shared/dashboard/DashboardSidebar";
import './DashboardLayout.css'

export default function DashboardLayout() {
    return (
        <>
            <div className="dashboard">
                
                <DashboardTopbar />
                <div className="app">
                    {/* SIDEBAR */}
                    <DashboardSidebar />

                    {/* MAIN */}
                    <main className="container">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
