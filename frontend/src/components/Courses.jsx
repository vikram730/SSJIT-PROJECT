import React , {useState , useEffect} from "react";
import {Input , Card } from 'semantic-ui-react'
import axios from 'axios';
import "./coursecss/styles.css"    
const Courses = () => {

    const [APIData, setAPIData] = useState([])
    const [searchInput , setSearchInput] = useState('');     //searchInput--> String
    const [filteredResults , setFilteredResults ] = useState([]);
  
    const searchItems = (searchValue) => {
      setSearchInput(searchValue);
      if (searchInput !== '') {
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());//Object.values to get the values from the object item. ;  Converting the values into a string using the join(' ') method.
      })//includes(searchInput.toLowerCase() --> We are checking that the data entered in the search box matches any value in our database, if yes than return the object's array otherwise return the empty array.
        setFilteredResults(filteredData);
      }
      else{
        setFilteredResults(APIData);
      }
  
    }
    
    
    // Getting the data of all the teachers
    axios.get(`http://localhost:80/allSubjectTeachers`)
        .then((response) => {
            setAPIData(response.data);
    })


    const containerClicked = () =>{
        console.log("hello");
    }


    // fetch the image from backend
    const [image , setImage] = useState([]);
    console.log(image);






    return (
       <>
        <div style={{ padding: 20 , display:"flex" , alignItems:"center" , justifyContent:'center' }}>
            <Input placeholder='Search...'  onChange={(e) => searchItems(e.target.value)}/> 
        </div>    
        <section className="main-card--cointainer">
        {searchInput.length > 1 ? ( 
            filteredResults.map((currentValue) => {
                return ( 
                    <>
                    <div className="card-container" key = {currentValue.id}>
                        <div className="card">
                        <img src={currentValue.image} alt="images" className="card-media" />
                            <div className="card-body">
                            <span >{currentValue.id}</span>
                                <span >{currentValue.name}</span>
                                <h2 >{currentValue.subjectsOfInterest}</h2> 
                                <span >{currentValue.description}</span>
                            </div>
                        </div>
                    </div>   
                    </> 
                )}
            )):( APIData.map((currentValue) => {
                return (
                    <>
                    <div className="card-container"  onClick={containerClicked} key = {currentValue.id}>
                        <div className="card">
                        <img src={currentValue.profile} alt="images" className="card-media" />
                            <div className="card-body">
                                {/* <span> - {currentValue.id}</span> */}
                                <span>Teacher's Name - {currentValue.name}</span>
                                <h2>{currentValue.subjectsOfInterest}</h2> 
                                <span>Email-ID - {currentValue.email}</span>   
                                <br />
                                <span>Available Mode Of Teaching - {currentValue.selectedModeOfTeaching}</span>
                            </div>  
                        </div>
                    </div>  
                   </>  
                )
            }))}
        </section>
    </>
    )
}   

export default Courses














