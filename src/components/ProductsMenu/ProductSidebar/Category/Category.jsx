import Input from '../Input';
import './Category.css';

function Category ({handleChange}) {
    return (
        <>
            <h2 className="sidebar-title">Category</h2>
            <div>
                <label className="sidebar-label-container">
                    <input onChange={handleChange} type="radio" value="" name="test"/>

                    <Input
                    handleChange={handleChange}
                    value=""
                    title="All"
                    name="test"
                />
                <Input
                    handleChange={handleChange}
                    value="Pizza"
                    title="Pizza"
                    name="test"
                />
                <Input
                    handleChange={handleChange}
                    value="Chicken"
                    title="Chicken"
                    name="test"
                />
                <Input
                    handleChange={handleChange}
                    value="Cake"
                    title="Cake"
                    name="test"
                />
                <Input
                    handleChange={handleChange}
                    value="Drink"
                    title="Drink"
                    name="test"
                />
                </label>

            </div>
        </>
    );
}

export default Category;