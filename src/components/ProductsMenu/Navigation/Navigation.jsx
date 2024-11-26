import {FiHeart} from 'react-icons/fi';
import {AiOutlineShoppingCart, AiOutlineUserAdd} from 'react-icons/ai';
import './Navigation.css';


function Navigation () {
    return (
        <div className="nav-Navigation">
            <nav>
            <div className="nav-product-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter your search food"
                />
                <div className="profile-container">
                    <a href="#">
                        <FiHeart className="nav-icons"/>
                    </a>
                    <a href="#">
                        <AiOutlineShoppingCart className="nav-icons"/>
                    </a>
                    <a href="#">
                        <AiOutlineUserAdd className="nav-icons"/>
                    </a>

                </div>

            </div>

        </nav>
        </div>
    );
}

export default Navigation;