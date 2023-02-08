//Importing the express module
import express from "express";
import {MongoClient} from "mongodb";
import * as dotenv from 'dotenv'

//Initializing the express and port number
const app = express();


dotenv.config()

// const MONGO_URL= process.env.MONGO_URL;

// console.log(process.env.MONGO_URL)  

const PORT = process.env.PORT

// Calling the express.json() method for parsing
app.use(express.json());

const rooms = [
    {
        name: "premium",
        roomId: "P001",
        amenities: "Air Conditioning, Free Wi-Fi, medium Podium",
        seats:"150",
        price: "2000INR/hr",
        booking_Details: [
            {
                Customer_Name:"Gokul Krishnan",
                Date: new Date("13-01-2023"),
                Starting_time: "08:00",
                Ending_time: "23:00",
                Status: "payment pending"
            }
        ]
    },
    {
        name: "Super-premium",
        roomId: "SP001",
        amenities: "Air Conditioning, AV facilities, Free Wi-Fi, Large Podium",
        seats:"300",
        price: "5000INR/hr",
        booking_Details: [
            {
                Customer_Name:"Gokulnath",
                Date: new Date("14-01-2023"),
                Starting_time: "08:00",
                Ending_time: "23:00",
                Status: "Confirmed"
            }
        ]
    }
];



// To create rooms
app.post("/createRoom", async (req, res) => {

    rooms.push({
        name:req.body.name,
        roomId:"R01",
        amenities:req.body.amenities,
        seats:req.body.seats,
        price:req.body.price,
        booking_Details: [{}]
    });

   await res.status(200).send("Room Created");
})

//Book rooms
app.post("/bookRoom", (req, res) => {
    for(let i=0; i<rooms.length; i++){
        console.log("a");
        // console.log("Rooms:",rooms);
        if(!(rooms[i].roomId === req.body.roomId)){
            return res.status(400).send({
                Error: "Invalid"
            })
        }else{
            let booking={
                Customer_Name:req.body.name,
                Date: new Date(req.body.Date),
                Starting_time:req.body.Starting_time,
                Ending_time: req.body.Ending_time,
                Status: "Confirmed"
            }
            let result = undefined;
            rooms[i].booking_Details.forEach((book)=>{
                if(book.Date.getTime()==booking.Date.getTime() && book.Starting_time===booking.Starting_time)
                {
                    result=0
                    console.log('in booking');
                }else{
                    result=1
                    rooms[i].booking_Details.push(booking)
                }
            })
            if(result)
            return res.status(200).send("Booking confirmed")
            else
            return res.status(400).send({
                Error: "please select different time slot"
            })
        }
    }

});

//List the customers
app.get("/listCustomer",(req, res) => {
    let customersArray = []
    rooms.forEach((room)=> {
        let customerObj = {roomName:room.name}

        room.booking_Details.forEach((customer)=> {
            customerObj.Customer_Name=customer.Customer_Name
            customerObj.Date=customer.Date
            customerObj.Starting_time=customer.Starting_time
            customerObj.Ending_time=customer.Ending_time

            customersArray.push(customerObj)
        })
    })

    res.send(customersArray)
});

//List room along with booking details

app.get("/listRooms",(req,res)=>{
    res.send(rooms)
})


// Listening to the port
app.listen(PORT, () => {

    console.log("Server is listening on PORT", PORT);
});