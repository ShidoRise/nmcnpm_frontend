import './Productin.css';
import ProductCard from '../ProductCard';
function Productin ({result}) {
    return (
        <>
            <section className="card-container">
                {result}
            </section>
        </>
    );
}

export default Productin;