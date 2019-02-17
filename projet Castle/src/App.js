 // src/App.js

 import React, { Component } from 'react';
 import './App.css';
 import Header from './components/Header';
 import Post from './components/Post';
 import hotel from './NodePart/bonjourJeMappelleSam.json';    
 class App extends Component {
   render() {
    const elem =hotel.hotelEtoile;
    const elem2 =hotel.prixHotel;
    const elem3 =hotel.urlPhoto;
    var arrow = [];
    for (var index = 0; index < 3; index++) {
      arrow[index] = <Post nickname={elem[index]} avatar="https://media.relaischateaux.com/public/hash/3637b84a6c96ddaf7c94ab860d3876c1716455f4" caption={elem2[index]} image={elem3[index]} />
    }
     return <div className="App">
         <Header />
         <section className="App-main">

          {arrow}

           {/* more posts */}
         </section>
       </div>;
   }
 }

 export default App;