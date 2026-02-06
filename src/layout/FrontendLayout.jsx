import { Outlet, Link } from "react-router-dom";

const FrontendLayout = () => {

    return (
        <>
            <header>
                <nav className="custom-navbar">
                    <div className="nav-links-group">
                        <Link className="nav-link-item" to='/'>首頁</Link>
                        <Link className="nav-link-item" to='/product'>產品列表</Link>
                        <Link className="nav-link-item" to='/cart'>購物車</Link>
                    </div>
                    <div className="nav-login-group">
                        <Link className="nav-link-item" to='/login'>登入後台</Link>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer className="mt-5 text-center">
                <p>© 2026 我的網站</p>
            </footer>
        </>
    )
}

export default FrontendLayout;
