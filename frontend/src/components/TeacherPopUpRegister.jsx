import React, {useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import axios from 'axios'
import { Multiselect } from 'multiselect-react-dropdown';
import Select from 'react-select'

const TeacherPopUpRegister = (props) => {

    const history = useHistory();

    const [teacher, setTeacher] = useState({
        name:"",email:"",age:"",gender:"",password:"",cpassword:"", profilePic:"", identityProof:""
    });


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setTeacher({...teacher, [name]:value});
    }

    // Profile pic
    const profilePicimageUplaod = (e) =>{
        // console.log(e.target.files[0])
        setTeacher({...teacher, profilePic: e.target.files[0]});
    } 

    // identityProof
    const identityProofimageUplaod = (e) =>{
        // console.log(e.target.files[0])
        setTeacher({...teacher , identityProof: e.target.files[0]});
    }

    
    //Multi Select Subjects
    const subjectName = [
            {
                value:1,
                label:"Maths"
            },
            {
                value:2,
                label:"Physics"
            },
            {
                value:3,
                label:"Chemistry"
            }
        ]

    const [data , setData] = useState(subjectName);
    const [selection , setSelection] = useState([]);
    var subjectsOfInterest = [];

    const onSelect= (data) =>{
       subjectsOfInterest = data;
       setSelection(subjectsOfInterest);
    }
   
    const onRemove = (data) =>{
        subjectsOfInterest = data;
        setSelection(subjectsOfInterest);
    }


    // Mode Of Teaching
    const Teaching_Mode = [
        { 
            label: "Online",
            value: 1 
        },
        { 
            label: "Offline", 
            value: 2 
        },
        { 
            label: "Both", 
            value: 3 
        }
      ];

    const [modeOfTeaching , setModeOfTeaching] = useState(Teaching_Mode);
    const [selectedMode , setSelectedMode] = useState([]);
    var selectedModeOfTeaching = [];
    const onSelection = (modeOfTeaching) => {
        selectedModeOfTeaching = modeOfTeaching;
        setSelectedMode(selectedModeOfTeaching);
    }   

    const PostData = async (e) => {
        e.preventDefault();

        var subjects = "";
        for(var i=0 ; i<selection.length ;i++){
          subjects += (selection[i].label + ",");
        }
        subjects = subjects.substring(0,(subjects.length-1));

        const url = '/registerAsTeacher';
        const formData = new FormData();
        formData.append('profilePic' , teacher.profilePic)
        formData.append('identityProof' , teacher.identityProof)
        formData.append('name' , teacher.name)
        formData.append('email' , teacher.email)
        formData.append('age' , teacher.age)
        formData.append('gender' , teacher.gender)
        formData.append('password' , teacher.password)
        formData.append('cpassword' , teacher.cpassword)                  
        formData.append('subjectsOfInterest' , subjects)                 //Subjects To Teach
        formData.append('selectedModeOfTeaching' ,selectedMode.label)    //Mode Of teaching


        const res = await axios.post(url,formData).then(response => {
                console.log("image uploaded")
                window.alert("Registration Successful, Once admin approves you will be able to login");
                document.getElementById('modalCloseBtn').click();
                history.push("/");
              }).catch(err => {
                  window.alert("Invalid Registration");
                   console.log("Invalid Registration");
                   console.log(err)
              });
        
    }
    
    return (
        <div>
            <div class="modal fade" id={props.id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-6">
                                <img src="https://source.unsplash.com/350x500/?study" alt="" height="100%" width="100%" />
                            </div>
                            <div className="col-12 col-sm-6 col-md-6">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Teacher Register</h5>
                                    <button type="button" class="btn-close" id= "modalCloseBtn" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form method="POST">
                                        <div class="mb-2">
                                            <label class="form-label">Name</label>
                                            <input type="text" class="form-control" value={teacher.name} onChange={handleInputs} id="name" name="name" placeholder="Name" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label">Email Address</label>
                                            <input type="text" class="form-control" value={teacher.email} onChange={handleInputs} id="email" name="email" placeholder="E-Mail" />
                                        </div>
                                        <div className="row">
                                        <div class="mb-2 col-6">
                                            <label class="form-label">Age</label>
                                            <input type="text" class="form-control" value={teacher.age} onChange={handleInputs} id="age" name="age" placeholder="Age" />
                                        </div>
                                        <div class="mb-2 col-6">
                                            <label class="form-label">Gender</label>
                                            <input type="text" class="form-control" value={teacher.gender} onChange={handleInputs} id="gender" name="gender" placeholder="Gender" />
                                        </div>
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label">Password</label>
                                            <input type="password" class="form-control" value={teacher.password} onChange={handleInputs} id="password" name="password" placeholder="Password" />
                                        </div>
                                        <div class="mb-2">
                                            <label class="form-label">Confirm Password</label>
                                            <input type="password" class="form-control" value={teacher.cpassword} onChange={handleInputs} id="cpassword" name="cpassword" placeholder="Confirm Password" />
                                        </div>

                                         {/*Select_Subject_Name*/}
                                        <div class="mb-2" style={{width:'100%', justifyContent:"center" }}>
                                            <label class="form-label">Select_Subject_Name</label>
                                            <Multiselect options={data}  displayValue="label" onSelect={onSelect} onRemove={onRemove}/>
                                        </div>

                                        {/* Teaching Method Online/Offline/Both */}
                                        <div class="mb-2">
                                            <label class="form-label">Mode Of Teaching</label>
                                            <Select options={modeOfTeaching} onChange={onSelection} />
                                        </div>   



                                        <div class="mb-2 col-6">
                                            <label class="form-label">Upload Profile Pic</label>
                                            <input type="file" class="form-control"  onChange={profilePicimageUplaod} id="profilePic" name="profilePic" placeholder="Upload Profile Pic" />
                                        </div>
                                        <div class="mb-2 col-6">
                                            <label class="form-label">Upload Your ID</label>
                                            <input type="file" class="form-control" onChange={identityProofimageUplaod} id="idProof" name="idProof" placeholder="Upload Your ID" />
                                        </div>
                                        <div class="mb-2 form-check">
                                            <input type="checkbox" class="form-check-input" id="rememberMe" />
                                            <label class="form-check-label" for="rememberMe">Remember me</label>
                                        </div>
                                        <div class="modal-footer d-block">
                                            <p class="float-start">Have an account <a href="#">Sign In</a></p>
                                            <button type="submit" class="btn btn-warning float-end" onClick={PostData}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherPopUpRegister;
