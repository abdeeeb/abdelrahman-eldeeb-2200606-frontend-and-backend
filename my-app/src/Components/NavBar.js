import './NavBar.css';

const NavBar = ({ navigate }) => {
    return (
        <nav>
            <div className="logo" onClick={() => navigate('home')}>
                Car Rental
            </div>
            <div>
                <ul>
                    <li onClick={() => navigate('login')}>Login</li>
                    <li onClick={() => navigate('register')}>Register</li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
