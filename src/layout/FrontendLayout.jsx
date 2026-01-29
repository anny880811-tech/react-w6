import { Outlet, Link } from "react-router-dom";

const FrontendLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container">
                        <div className="navbar-nav">
                            <Link className="h4 mt-3 mx-4" to='/'>首頁</Link>
                            <Link className="h4 mt-3 mx-4" to='/product'>產品頁面</Link>
                            <Link className="h4 mt-3 mx-4" to='/cart'>購物車頁面</Link>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center">
                <p>© 2025 我的網站</p>
            </footer>
        </>
    )
}

export default FrontendLayout;
