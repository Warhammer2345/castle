 // src/App.js

 import React, { Component } from 'react';
 import './App.css';
 import Header from './components/Header';
 import Post from './components/Post';
 import hotel from './NodePart/listeHotel.json';   
 import ReactDOM from 'react-dom'; 
 class App extends Component {
   render() {
    const elem =hotel.hotelEtoile;
    const elem2 =hotel.prixHotel;
    const elem3 =hotel.urlPhoto;
    const elem4 =hotel.urlFinale;
    var arrow = [];
    var arrows = [];
    for (var index = 0; index < elem.length-1; index++) {
      if(index<3)
        arrow[index] = <Post nickname={elem[index]} avatar="https://media.relaischateaux.com/public/hash/3637b84a6c96ddaf7c94ab860d3876c1716455f4" caption={elem2[index]} image={elem3[index]} link={elem4[index]} />
      arrows[index] = <Post nickname={elem[index]} avatar="https://media.relaischateaux.com/public/hash/3637b84a6c96ddaf7c94ab860d3876c1716455f4" caption={elem2[index]} image={elem3[index]} link={elem4[index]} />
      
    }
    function desactiver() {
      console.log("hello");
      ReactDOM.render(<ul>{arrow}</ul>,document.getElementById('test'))
      }
      function activer()
      {      
      console.log("hello");
      ReactDOM.render(<ul>{arrows}</ul>,document.getElementById('test'))
      }
     return <div className="App">
         <Header />
         <h3>Afficher tous les hotels :
         <input id="oui" type="radio" name="inscription" value="oui" onClick={activer}/>Oui
         <input id ="non" type="radio" name="inscription" value="non" onClick={desactiver} />Non </h3> 
         <section className="App-main">

          <div id="test">{arrow}</div>

           {/* more posts */}
         </section>
       </div>;
   }
 }

 export default App;