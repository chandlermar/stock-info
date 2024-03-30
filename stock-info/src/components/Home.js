
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card'
import cardsData from './cardsData'
import AutorenewSharpIcon from '@mui/icons-material/AutorenewSharp';
import './styles.css'

function Home() {

    const [randomNumber, setRandomNumber] = useState(null)

    useEffect(() => { //Call when component mounts
            generateRandomNumber();        
        }, []);

    const generateRandomNumber = () => {
        const newRandomNumber = Math.floor(Math.random() * 16) + 1;
        setRandomNumber(newRandomNumber);
    }

    return (
        <div style={{ backgroundColor: 'white',  width: '100vw', minHeight: '100vh', paddingTop: '1px' }}>
            <div className="header">
                    <h1>
                        <Link 
                            onClick={generateRandomNumber}
                            to={{
                                pathname: `/card/${randomNumber}`
                            }}
                        >   
                            <AutorenewSharpIcon className ="randomizer"/>
                        </Link>
                        Stock Details
                    </h1>
            </div>

            <div className="card-container">
                    {cardsData.map((card) => (
                        <Link  
                            key={card.id} 
                            to={{
                                pathname: `/card/${card.id}`
                            }}
                            className="card1"
                        >
                            <Card 
                                title={<span className="card-title">{card.ticker}</span>} 
                                content={<span className="card-title">{card.content}</span>}
                            />
                        </Link>
                    ))}
            </div>
        </div>
    )
}

export default Home;

