import './ButtonMenu.css'

function ButtonMenu({onClickHandler, value, title}) {
    return (
        <button onClick={onClickHandler} value={value} className="btns">{title}</button>
    );
}

export default ButtonMenu;