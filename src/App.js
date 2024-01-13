import React from 'react';
import PieComponent from './Components/pieComponent'; // Make sure to use the correct path to your PieChart component
import Header from './Components/header';
import BarGraph from './Components/barGraphComponent';
import MoneyMade from './Components/moneyMadeDisplay';

const App = () => {
  return (
    <>
    <div style={{ backgroundColor: '#070045', color: 'white', minHeight: '100vh', padding: '20px'}}>

      <Header />
      <div style={{display:'flex',gap:'30px',justifyContent:'space-evenly', marginTop:'70px'}}>
      <PieComponent  />
      <div>
      <BarGraph />

      <MoneyMade/>
      </div>
      </div>
      
    </div>
    
    </>
  );
}

export default App;