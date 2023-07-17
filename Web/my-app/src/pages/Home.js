import React from "react";
import homeImage from '../assets/happybirthday.jpg';
import googleplay from '../assets/googleplay.png'

function Home(props) {
    return (
        <div style={{position: 'relative'}}>
            <img src={homeImage} alt="Home" style={{width: '100%', height: 'auto', marginTop: '200px', marginBottom: '200px'}}/>
            <h1 style={{
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                color: 'white'
            }}>
                당신의 생일을 소중한 사람들과 함께 하세요
            </h1>
            <img src={googleplay} alt="Download on Google Play" style={{
                position: 'absolute', 
                right: '20px', 
                bottom: '20px', 
                width: '150px', 
                height: 'auto'
            }}/>
        </div>
    );
}

export default Home;
