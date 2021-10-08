const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const multer = require('multer')
require('../db/conn');
const cors = require('cors');
const Teacher = require('../model/teachersDoc');
const Student = require('../model/studentDoc');

// Google Login Verification 
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client("692159986395-b09gatkl3s8t3rhc99thg0jgm26d7jc9.apps.googleusercontent.com")


// const Teacher_Selection = require('./model/teachersDoc')

router.get('/', (req, res) => {
    res.send("Hello World From Server router js");
});

var uniqueIdForImg = Date.now();

router.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, uniqueIdForImg + '_' + file.originalname)
    }
})

var upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'profilePic', maxCount: 1 }, { name: 'identityProof', maxCount: 1 }])

router.post('/registerAsTeacher', cpUpload, async (req, res) => {
    // console.log(req.files['profilePic'][0]);

    // Check if files are present or not
    if ((!req.files['profilePic'][0]) && (!req.files['identityProof'][0])) {
        return res.status(422).json({ error: "Please Upload a File." });
    }

    const { name, age, gender, email, password, cpassword, subjectsOfInterest, selectedModeOfTeaching } = req.body;
    if (!name || !age || !gender || !email || !password || !cpassword || !subjectsOfInterest || !selectedModeOfTeaching) {
        console.log(req.body)
        console.log("hello")
        console.log("Server Fill All the details");
        return res.status(422).json({ error: "Please Fill all the details." });
    }


    try {
        const teacherExist = await Teacher.findOne({ email: email })
        if (teacherExist) {
            return res.status(422).json({ error: "Email already Exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password & Confirm Password Not Match" });
        } else {
            var profile = req.files['profilePic'][0].filename;
            var idProof = req.files['identityProof'][0].filename;
            var isApproved = false;
            const teacher = new Teacher({ name, age, gender, email, password, cpassword, profile, idProof, isApproved, subjectsOfInterest, selectedModeOfTeaching });

            await teacher.save();
            res.status(201).json({ message: "Teacher Registered Successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/registerAsStudent', async (req, res) => {
    console.log(req.body);
    const { name, standard, location, email, password, cpassword } = req.body;
    if (!name || !standard || !location || !email || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill all the details." });
    }
    try {
        const studentExist = await Student.findOne({ email: email })
        if (studentExist) {
            return res.status(422).json({ error: "Email already Exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Password & Confirm Password Not Match" });
        } else {
            const student = new Student({ name, standard, location, email, password, cpassword });
            await student.save();
            res.status(201).json({ message: "Student Registered Successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});


router.post('/loginTeacher', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Plz Fill the data" });
        }
        const teacherLogin = await Teacher.findOne({ email: email });

        if (teacherLogin) {
            const isMatch = await bcrypt.compare(password, teacherLogin.password);
            
            token = await teacherLogin.generateAuthTokenTeacher();
            console.log(token + "loginToken")
        
            teacherdetail = await teacherLogin.getCleanUser();
            teacherDetail = JSON.stringify(teacherdetail);
            
            if(!teacherLogin.isApproved){
                console.log("Error");
               return res.status(400).json({ error: "User not activated"});
            }
            if (!isMatch) {
                return res.status(400).json({ error: "Teacher SignIN Error, Invalid Credentials" });
            } else {
                //res.json({ message: "Teacher SignIn Successfully" });

                return res.status(200).json({
                    teacher: teacherDetail,
                    token: token
                });
            }
        } else {
            return res.status(400).json({ error: "Teacher SignIN Error, Invalid Credentials" });
        }

    } catch (err) {
        console.log(err);
    }
});


// verify the token and return it if it's valid
router.get('/verifyToken', (req,res)=>{
    // check header or url parameters or post parameters for token
  
    // const token;
    // console.log( token.generateAuthTokenTeacher());
    // console.log(token + "loginToken@")
//     if(!token){
//         return res.status(400).json({
//             error:true,
//             message: 'Token is required'
//         });
//     }

//     // check token that was passed by decoding token using secret
//     if(err){
//          return res.status(401).json({
//             error:true,
//             message: "Invalid Token"
//         });
//      }

//     // return 401 status if the userId does not match. 
//     if(user.userId!==userData.userId){
//         return res.status(401).json({
//             error:true,
//             message:"Invalid Token"
//         });
//     }

//     // get basic user details
//     var userObj = utils.getCleanUser(userData);
//     return res.json({
//         user : userObj,
//         token : token
//     });
});


router.post('/loginStudent', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Plz Fill the data" });
        }
        const studentLogin = await Student.findOne({ email: email });

        if (studentLogin) {
            // console.log(studentLogin);

            const isMatch = await bcrypt.compare(password, studentLogin.password);

            token = await studentLogin.generateAuthTokenStudent();

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "Student SignIN Error, Invalid Credentials" });
            } else {
                res.json({ message: "Student SignIn Successfully" });
            }
        } else {
            res.status(400).json({ error: "Student SignIN Error, Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});

router.get('/about', authenticate, (req, res) => {
    console.log("Hello My About after middleware");
    res.send("Hello World From About");
});


//All Teacher's Data Coming From Data Base

//All Subject Teacher's - Maths, Physics, Chemistry
router.get("/allSubjectTeachers", async (req, res) => {
    try {
        const getallSubjectTeachers = await Teacher.find({});                  //Its returns the promise
        res.status(200).send(getallSubjectTeachers);
    } catch (error) {
        res.status(400);
    }
})


// Math Teacher's Only
router.get("/mathsTeacher", async (req, res) => {
    try {
        const mathsTeacher = await Teacher.find({}, { "subjectsOfInterest": "Maths" });                  //Its returns the promise
        res.status(200).send(mathsTeacher);
    } catch (error) {
        res.status(400);
    }
})

// Physics Teacher's Only
router.get("/mathsTeacher", async (req, res) => {
    try {
        const physicsTeacher = await Teacher.find({}, { "subjectsOfInterest": "Physics" });                  //Its returns the promise
        res.status(200).send(physicsTeacher);
    } catch (error) {
        res.status(400);
    }
})

// Chemistry Teacher's Only
router.get("/mathsTeacher", async (req, res) => {
    try {
        const mathsTeacher = await Teacher.find({}, { "subjectsOfInterest": "Chemistry" });                  //Its returns the promise
        res.status(200).send(mathsTeacher);
    } catch (error) {
        res.status(400);
    }
})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// router.get("/mathsandchemistryTeacher" , async (req,res)=>{
//     try{
//        const mathsTeacher = await Teacher.find({} , {"subjectsOfInterest" : "Maths"});                  //Its returns the promise
//        res.status(200).send(mathsTeacher);  
//     }catch(error){
//         res.status(400);
//     }
// })

// router.get("/mathsTeacher" , async (req,res)=>{
//     try{
//        const mathsTeacher = await Teacher.find({} , {"subjectsOfInterest" : "Maths"});                  //Its returns the promise
//        res.status(200).send(mathsTeacher);  
//     }catch(error){
//         res.status(400);
//     }
// })

// router.get("/mathsTeacher" , async (req,res)=>{
//     try{
//        const mathsTeacher = await Teacher.find({} , {"subjectsOfInterest" : "Maths"});                  //Its returns the promise
//        res.status(200).send(mathsTeacher);  
//     }catch(error){
//         res.status(400);
//     }
// })


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Student Login By Google
router.post('/googleLogin', async (req, res) => {
    const { tokenId } = req.body;
    console.log()
    client.verifyIdToken({ idToken: tokenId, audience: "692159986395-b09gatkl3s8t3rhc99thg0jgm26d7jc9.apps.googleusercontent.com" }).then(response => {
        const { email_verified, name, email } = response.payload;
        console.log(response.payload);
        
        const StudentExist = Student.findOne({ email: email }).then(Student => {
            if (Student) {
                console.log("already exist");
                return res.status(200).json({ error: "Email already Exists" });
                
            }else{
                const Student = new Student({name : name, email : email});
                Student.save();
                return res.status(200).json({message : "Teacher SignIn Successfully"} )
            }
        }).catch(error => {
            console.error(error)
            return res.status(401).json({message : "Authentication Failed"} )
        });

    })
    console.log();
})

module.exports = router;