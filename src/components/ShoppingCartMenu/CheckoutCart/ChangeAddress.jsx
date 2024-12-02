const ChangeAddress = (props) => {
    return(
        <div className="modal-address">
            <div className="modal-content-address">
                <h4>New Address</h4>
                
                <form className='new-address' action="/submit" method="POST" 
                onSubmit={(event)=>{
                    props.handleSetAddress(event);
                    props.closeChangeAddress();
                    }}>
                    <input  type="text" placeholder="Your new address" onChange={(event)=>props.handleSetNewAddress(event)} required />
                    <button type="submit">Save Change</button>
                </form>
            </div>
        </div>
    );
}
export default ChangeAddress;