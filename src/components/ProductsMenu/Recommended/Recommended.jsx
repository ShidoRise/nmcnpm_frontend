import './Recommended.css';
import ButtonMenu from '../ButtonMenu/ButtonMenu';

function Recommended ({handleClick}) {
    return (
        <>
            <div>
                <h2 className="recommended-title">Recommended</h2>
                <div className="recommended-flex">
                    <button className="btns">All Products</button>
                    <ButtonMenu onClickHandler={handleClick} value="Chicken" title="Pizza"/>
                </div>
            </div>
        </>
    );
}

export default Recommended;