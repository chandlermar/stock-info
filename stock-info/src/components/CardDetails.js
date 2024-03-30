import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import cardsData from './cardsData'
import KeyboardReturnSharpIcon from '@mui/icons-material/KeyboardReturnSharp';
import axios from "axios";

function CardDetails() {
  const { id } = useParams(); 
  const card = cardsData.find(card => card.id === parseInt(id));
  const [stockData, setStockData] = useState(null);
  const [prevStockData, setPrevStockData] = useState(null);
  const [companyOverview, setCompanyOverview] = useState(null);
  const [lastTradingDay, setLastTradingDay] = useState(null);

  const location = useLocation();

  useEffect(() => { //Call when component mounts
    if (card) {
        getStockData();
        getCompanyOverview();
    }
    
  }, [card]);

  const getStockData = async () => {
    try {
      const baseUrl = "https://www.alphavantage.co/query";

      const response = await axios.get(
        `${baseUrl}?function=TIME_SERIES_DAILY&symbol=${card.ticker}&interval=5min&apikey=ENTERKEYHERE`
      );

      const stockPrices = response.data["Time Series (Daily)"]; //dates
      const stockPricesKeys = Object.keys(stockPrices); //store dates as keys
      const lastTradingDay = stockPricesKeys[0];
      const previousTradingDay = stockPricesKeys[1];
      const lastTradingDayQuote = stockPrices[lastTradingDay];
      const previousTradingDayQuote = stockPrices[previousTradingDay];

      setLastTradingDay(lastTradingDay);
      setPrevStockData(previousTradingDayQuote);
      setStockData(lastTradingDayQuote);

    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const getCompanyOverview = async () => {
    try {
        const baseUrl = "https://www.alphavantage.co/query";
        const response = await axios.get(
            `${baseUrl}?function=OVERVIEW&symbol=${card.ticker}&apikey=ENTERKEYHERE`
          );
        setCompanyOverview(response.data);
    }
    catch (error) {
        console.error("Error fetching stock overview:", error);
      }
  }

  return (
    <div style={{ backgroundColor: 'white',  width: '100vw', minHeight: '100vh', paddingTop: '1px' }}>
        {stockData && (
            <div>
                <h1 className = "info-header">
                    <Link 
                        to={{
                            pathname: "/"
                        }}
                    >   
                        <KeyboardReturnSharpIcon className="back"/>
                    </Link>
                { card.ticker }
                </h1>

            <h3 className = "info-subheader"> {companyOverview["Description"]} </h3>
            <div className = "info-container">
                <div className = "info-container-left">
                    <p><b>Name: </b> {companyOverview && companyOverview["Name"] ? companyOverview["Name"] : 'N/A'} </p>
                    <p><b>Industry: </b> {companyOverview && companyOverview["Industry"] ? companyOverview["Industry"] : 'N/A'} </p>
                    <p><b>Asset Type: </b> {companyOverview && companyOverview["AssetType"] ? companyOverview["AssetType"] : 'N/A'} </p>
                    <p><b>Exchange: </b> {companyOverview && companyOverview["Exchange"] ? companyOverview["Exchange"] : 'N/A'} </p>
                    <p><b>Sector: </b> {companyOverview && companyOverview["Sector"] ? companyOverview["Sector"] : 'N/A'} </p>
                </div>

                <div className = "info-container-right">
                    <p><b>Market Capitalization: </b> ${companyOverview && companyOverview["MarketCapitalization"] ? companyOverview["MarketCapitalization"] : 'N/A'} </p>
                    <p><b>Date: </b> {lastTradingDay} </p>
                    <p><b>Close Price: </b> ${parseFloat(stockData["4. close"]).toFixed(2)} </p>
                    <p><b>Volume: </b> ${stockData["5. volume"]} </p>
                    <p><b>% Change From Previous Day: </b> {(((stockData["4. close"] - prevStockData["4. close"]) / Math.abs(prevStockData["4. close"])) * 100).toFixed(2)}%</p>
                </div>
            </div>
        </div>
        )}
      
    </div>
  );
}

export default CardDetails;