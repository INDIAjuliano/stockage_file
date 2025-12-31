import { Outlet } from "react-router-dom";
import SiteNavbar from "../shared/site/SiteNavbar";
import SiteFooter from "../shared/site/SiteFooter";

export default function SiteLayout() {
    return (
        <>
        <div className="site">
            <SiteNavbar />
            <main >
                <Outlet />
            </main>
            <SiteFooter />
            </div>
        </>
    );
}
