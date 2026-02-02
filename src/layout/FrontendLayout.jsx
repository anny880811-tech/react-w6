import { Outlet, Link } from "react-router-dom";

const FrontendLayout = () => {
    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
                    <div className="container">
                        <div className="navbar-nav">
                            <Link className="nav-link-item" to='/'>首頁</Link>
                            <Link className="nav-link-item" to='/product'>產品頁面</Link>
                            <Link className="nav-link-item" to='/cart'>購物車頁面</Link>
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
