import React, { Component, useState,useEffect } from "react";
import { useNavigate} from "react-router-dom";
import Page1 from "../../assets/img1.jpg";
import { GoogleMap, LoadScript,Circle, Marker } from '@react-google-maps/api';
// import "./mapindex.js"
import "../../styles/maps.scss";
import axios from 'axios';
 const Maps = () => {
  let navigate=useNavigate();
  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  let link=`http://localhost:5000/user/showevent`
  
  const [data, setData] = useState('');

  // useEffect(()=>{

  //   fetch(link,{
  //     headers:{
  //       "Authorization":"Bearer"+localStorage.getItem("jwt")
  //     }
  //   }).then(res=>res.json())
  //   .then(result=>{
  //     if(!(result.success)){
        
  //       navigate("/signin");
  //     }
  //     setData(result.data)
  //     console.log(data)

      
  //   })
  // },[])
  

  
  
  // const center1 = [
  //   {
  //     lat: 25.4930,
  //     lng: 81.8607,
  //     radius:50,
  //     color:"blue"
  //   },
  //   {
  //     lat: 25.4984,
  //     lng: 81.8677,
  //     radius:200,
  //     color:"red"
  //   },
  //   {
  //     lat: 25.4904,
  //     lng: 81.8697,
  //     radius:100,
  //     color:"yellow"
  //   }
  // ];

  // const circleOptions = {
  //   strokeColor: "#FF0000",
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: "#FF0000",
  //   fillOpacity: 0.35,
  //   center: center,
  //   radius: 1000 // in meters
  // };
  // const place= 
  //   {
  //     id: 1,
  //     name: "Park Slope",
  //     latitude: "40.6710729",
  //     longitude: "-73.9988001",
  //     circle: {
  //       radius: 3000,
  //       options: {
  //         strokeColor: "#ff0000"
  //       }
  //     }
  //   };

  const center={
    lat: data && data[0].cordinate.x,
    lng:data &&  data[0].cordinate.y
  }

  return (
    <div className='maps' >
      <div className='first-div'>
      <h1>Disasters  Lists</h1>
      <ul className='list'>
        <li style={{color:'brown'}}>Earthquake</li>
        <li style={{color:'purple'}}>Tsunami</li>
        <li style={{color:'blue'}}>Flood</li>
        <li style={{color:'red'}}>Fire</li>
        <li style={{color:'green'}}>drought</li>
        <li style={{color:'chocolate'}}>landslide</li>
        <li style={{color:'coral'}}>typhoon</li>
        <li style={{color:'darkgoldenrod'}}>tornado</li>
      </ul>  
    </div>
      <div className='second-div'> 
        
          <LoadScript
          googleMapsApiKey="AIzaSyB3dJ2rmgWK24iGmIDsNJBf9I9x2_m_-X8"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18}
          >
          <>
          
          {data && data.map((c)=>(
                <>  
                
                  <Marker
                    position={{ lat: c.cordinate.x, lng: c.cordinate.y }}
                    title="hello"
                  />
                  <Circle
                    center={{  lat: c.cordinate.x, lng: c.cordinate.y  }}
                    radius={c.radius} // radius in meters
                    options={{
                      strokeColor: "blue",
                     strokeOpacity: 0.8,
                      strokeWeight: 2,
                     fillColor: "blue",
                      fillOpacity: 0.35,
                  }}
                  />
                </> 
              ))}     
        
          </> 
          

         </GoogleMap>
        </LoadScript>
      </div>
    </div>
  ) 
} 

export default Maps


// {center1 && center1.map((c)=>(
//               <>
//                 <Marker
//                   position={{ lat: c.lat, lng: c.lng }}
//                   title="Your marker title"
//                 />
//                 <Circle
//                   center={{ lat: c.lat, lng: c.lng }}
//                   radius={c.radius} // radius in meters
//                   options={{
//                     strokeColor: "blue",
//                     strokeOpacity: 0.8,
//                     strokeWeight: 2,
//                     fillColor: "blue",
//                     fillOpacity: 0.35,
//                 }}
//                 />
//               </>
//             ))} 



                // <Circle
                //   center={{ lat: center.lat, lng: center.lng }}
                //   radius={c.radius} // radius in meters
                //   options={{
                //     strokeColor: "blue",
                //     strokeOpacity: 0.8,
                //     strokeWeight: 2,
                //     fillColor: "blue",
                //     fillOpacity: 0.35,
                // }}
                // />


                // {center && (
                //   <Marker
                //     position={{ lat: center.lat, lng: center.lng }}
                //     title="Your marker title"
                //   />
                // )}   
                // <Circle
                //         center={{ lat: center.lat, lng: center.lng }}
                //         radius={100} // radius in meters
                //         options={{
                //           strokeColor: "blue",
                //           strokeOpacity: 0.8,
                //           strokeWeight: 2,
                //           fillColor: "blue",
                //           fillOpacity: 0.10,
                //       }}
                //       />