const express = require('express')
//model defined
const User = require('../models/User')
const Order = require('../models/Students')
const AT = require('../models/AT')
const PD = require('../models/Pd')
const Chat = require('../models/Chat')
const Pre = require('../models/Pre')
const Qa = require('../models/adhd')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');
const fetch = require('../middleware/fetchdetails');
const jwtSecret = "HaHa"
const cors = require("cors");
const users = require("../models/userSchema");
const bodyParser = require("body-parser");
router.post('/createuser', [
    // 1.Validation starts
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() })
    }
    // 2. Salting the password
    const salt = await bcrypt.genSalt(10)
    let securePass = await bcrypt.hash(req.body.password, salt);
    // 3.Creating an entry of correct inputs
    try {
        await User.create({
            name: req.body.name,
            password: securePass,
            email: req.body.email,
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
    } catch (error) {
        console.error(error.message)
    }
})

// Authentication a User, No login Requiered
router.post('/login', [
    body('email', "Enter a Valid Email").isEmail(),
    body('password', "Password cannot be blank").exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
// 4. How to define variables for body payload
    const { email, password } = req.body;
    try {
        // 5. Fetch user specific payload
        let user = await User.findOne({ email });  //{email:email} === {email}
        if (!user) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
// 6. Compare input password with salt
        const pwdCompare = await bcrypt.compare(password, user.password); // this return true false.
        if (!pwdCompare) {
            return res.status(400).json({ success, error: "Try Logging in with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, jwtSecret);
        res.json({ success, authToken })


    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
    }
})

// Get logged in User details, Login Required.
router.post('/getuser', fetch, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // -password will not pick password from db.
        res.send(user)
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")

    }
})   

//Here email and product_id are variable on front end
router.post('/addp', async (req, res) => {
        await Order.create({
            customer_mail: req.body.email,
            product_id: req.body.product_id,
        })
});

router.post('/addpp', async (req, res) => {
    await Op.create({
        mail: req.body.mail,
        name: req.body.data1,
    })
});

//Here user data sent in params gets in query
router.get("/products", async(req, res) => {
    const email = req.query.email;
    console.log(email)
    const data = await Order.find({'customer_mail':email});
    console.log(data)
    res.json(data);
  });

  //Below example whole collection was stored in an entry and provided way to fetch data back
  router.get("/productsi", async(req, res) => {
    const email = req.query.email;
    console.log(email)
    //const data = await Op.find({});
    const data = await Op.find({'mail':email});
    //const data = await Op.find({'mail':"Rahuly@yes.com"});
    console.log(data)
    // res.json(data[0].name[1]);
    res.json(data[0].name);
  });


  router.get("/prod", async(req, res) => {
    res.json(global.prod);
  });

  router.post('/addpp', async (req, res) => {
    await Op.create({
        mail: req.body.mail,
        name: req.body.data1,
    })
});


router.post('/addqa', async (req, res) => {
    try {
      const { data } = req.query; // Use req.query to access data from query parameters
  
      // Create a new document using the Qa model
      const newQa = new Qa({
        data: JSON.parse(data), // Parse the data as JSON
        // Add more fields as needed for your "qas" collection
      });
  
      // Save the new document to the "qas" collection
      const savedQa = await newQa.save();
  
      res.json(savedQa);
    } catch (error) {
      console.error('Error adding QA:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  router.post('/store-sender-info', async (req, res) => {
    try {
      const { whatsappNumber, userName, prompt } = req.body;
  
      // Create a new document using the SenderInfo model
      const newSenderInfo = new Qa({
        whatsappNumber,
        userName,
        prompt,
      });
  
      // Save the new document to the database
      await newSenderInfo.save();
  
      res.json({ message: 'Sender info stored successfully' });
    } catch (error) {
      console.error('Error storing sender info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.get('/getQas', async (req, res) => {
    try {
      const allQas = await Qa.find(); // This will fetch all documents from the "qas" collection
      res.json(allQas);
    } catch (error) {
      console.error('Error fetching QAs:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
router.get('/users', async (req, res) => {
    try {
      const allUsers = await User.find(); // This will fetch all documents from the "users" collection
      res.json(allUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  //_____register

  router.post("/register",async(req,res)=>{
    // console.log(req.body);
    const {name,email,age,mobile,work,add,desc} = req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("plz fill the data");
    }

    try {
        
        const preuser = await users.findOne({email:email});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this is user is already present");
        }else{
            const adduser = new users({
                name,email,age,mobile,work,add,desc
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    } catch (error) {
        res.status(422).json(error);
    }
})

// API endpoint for Pre-diag data
router.post('/pre', (req, res) => {
    const { mobileNumber, dataArray } = req.body;
  
    if (!mobileNumber || !dataArray) {
      return res.status(400).json({ error: 'mobileNumber and dataArray are required' });
    }
  
    const newOp = new Pre({
      mobileNumber: mobileNumber,
      dataArray: dataArray
    });
  
    newOp.save()
      .then(() => {
        res.json({ message: 'Data saved successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving data' });
      });
  });

  // API endpoint for Chat storing data
router.post('/chat', (req, res) => {
    const { mobileNumber, dataArray } = req.body;
  
    if (!mobileNumber || !dataArray) {
      return res.status(400).json({ error: 'mobileNumber and dataArray are required' });
    }
  
    const newOp = new Chat({
      mobileNumber: mobileNumber,
      dataArray: dataArray
    });
  
    newOp.save()
      .then(() => {
        res.json({ message: 'Data saved successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving data' });
      });
  });

  // API endpoint for AT storing data
router.post('/at', (req, res) => {
    const { mobileNumber, dataArray } = req.body;
  
    if (!mobileNumber || !dataArray) {
      return res.status(400).json({ error: 'mobileNumber and dataArray are required' });
    }
  
    const newOp = new AT({
      mobileNumber: mobileNumber,
      flag: 'Y',
      dataArray: dataArray
    });
  
    newOp.save()
      .then(() => {
        res.json({ message: 'Data saved successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving data' });
      });
  });

  // //for reading data of AT
  // router.get('/adh', async (req, res) => {
  //   try {
  //     const allQas = await AT.find(); // This will fetch all documents from the "qas" collection
  //     res.json(allQas);
  //   } catch (error) {
  //     console.error('Error fetching QAs:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // });

// for reading data of AT where flag is 'Y'
router.get('/adh', async (req, res) => {
  try {
    const filteredQas = await AT.find({ flag: 'Y' }, { mobileNumber: 1, _id: 1 }); // This will fetch all documents from the "qas" collection where flag is 'Y' and only return the 'mobileNumber'
    res.json(filteredQas);
  } catch (error) {
    console.error('Error fetching QAs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // API endpoint for updating flag

  router.put('/up', async (req, res) => {
    const { _id, newFlag } = req.body;
  
    if (!_id || !newFlag) {
      return res.status(400).json({ error: 'mobileNumber and newFlag are required' });
    }
  
    try {
      const updatedOp = await AT.findOneAndUpdate(
        { _id: _id },  // find record with this mobileNumber
        { flag: newFlag },  // update the flag
        { new: true }  // return the updated document
      );
  
      if (!updatedOp) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      res.json({ message: 'Flag updated successfully', updatedData: updatedOp });
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/pd', (req, res) => {
    const { mobileNumber, dataArray } = req.body;
  
    if (!mobileNumber || !dataArray) {
      return res.status(400).json({ error: 'mobileNumber and dataArray are required' });
    }
  
    const newOp = new PD({
      mobileNumber: mobileNumber,
      dataArray: dataArray
    });
  
    newOp.save()
      .then(() => {
        res.json({ message: 'Data saved successfully' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error saving data' });
      });
  });
  
  
module.exports = router