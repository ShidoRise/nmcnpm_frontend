import Input from '../Input';
import './Price.css';

function Price ({handleChange}) {
    return (
        <>
            <div className="ml">
                <h2 className="sidebar-title price-title">Price</h2>

                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test"/>

                    <Input
                    handleChange={handleChange}
                    value="Pizza"
                    title="Pizza"
                    name="test"
                /><Input
                handleChange={handleChange}
                value="Pizza"
                title="Pizza"
                name="test"
            /><Input
            handleChange={handleChange}
            value="Pizza"
            title="Pizza"
            name="test"
        />
                </label>

            </div>
        </>
    );
}

export default Price;