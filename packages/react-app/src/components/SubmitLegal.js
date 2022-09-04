import React from 'react';
import { InputText } from '.';
import {Submit} from '/';


const SubmitLegal = () => {
    return (
        <div>
            <h2>Fund Poland legal fees</h2>
            <p>Current money pledged: 330.00 €</p>
            <p>Fully pledged, waiting for legal work</p>
            <br />

            <form onSubmit={() => {console.log("submitted")}}>
                <label htmlFor="myfile">Select a file: </label>
                <input type="file" id="myfile" name="myfile" />
                <br />
                <label style={{marginTop: 5}} htmlFor="address">Write your wallet address: </label>

                <InputText  id="address" name="myfile" />
                <br />

                <Submit value='Submit legal documents' style={{marginTop: 30 }}/>
            </form>
        </div>
    );
}

export default SubmitLegal;