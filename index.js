const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

app.get("/test-1", (req, res) => {
    res.status(200).send({ "status": "success" })
})

app.post("/test-1", (req, res) => {
    res.status(200).send({ "status": "success" })
})

app.get("/test-2", (req, res) => {
    res.status(401).send({ "authorizationResult": "Access Denied" })
})

app.post("/test-3", (req, res) => {
    res.status(201).send({ "status": "Created" })
})

app.put("/test-4", (req, res) => {
    res.status(200).send("Already Updated")
})

app.delete("/test-5", (req, res) => {
    res.status(204).send({ "message": "Deleted" })
})

app.get('/getQuery', function (req, res) {
    console.log(req.query)
    res.send(req.query);
  })

app.get('/user', (req,res)=>{
    console.log(req.query.id)
    res.send(req.query.id)
})
  
const students = [
    { name: 'sonter', age: 19 },
    { name: 'nat', age: 30 },
    { name: 'tle', age: 14 },
  ]
  // localhost:3000/student/2
  app.get('/student/:id', function (req, res) {
    if (req.params.id == 0) {
      res.send(students[0])
    } else if (req.params.id == 1) {
      res.send(students[1])
    } else if (req.params.id == 2) {
      res.send(students[2])
    } else {
      res.status(404).send({ message: 'User not found' })
    }
  })

  app.get('/student/:id/:age', function (req, res) {
    console.log(req.params.id)
    console.log(req.params.age)
    res.send(req.params)
})
// localhost:3000/add/5/10
app.get('/add/:a/:b', function (req, res) {
    var a = parseInt(req.params.a)
    var b = parseInt(req.params.b)
    // var c = a+b
    // console.log(c)
   // var d = c.toString()
    res.send((a+b).toString())
  })

// localhost:3000/calculation/divide?first=55&second=6
app.get("/calculation/:method", (req, res) => {
    const method = req.params.method; // divide
    const first = +req.query.first; // 55
    const second = +req.query.second; // 6
    if (method === "add") {
        res.send({ "result": first + second })
    } else if (method === "subtract") {
        res.send({ "result": first - second })
    } else if (method === "multiply") {
        res.send({ "result": first * second })
    } else if (method === "divide") {
        res.send({ "result": first / second })
    }
})

// localhost:3000/add?a=5&b=10 ใช้วิธีส่งค่าแบบ query ไม่ได้
// ต้องใช้ body-parser เพราะค่าไม่ได้ส่งผ่าน query string
app.post('/add', function (req, res) {
    var a = parseInt(req.body.a)
    var b = parseInt(req.body.b)
    res.send(String(a + b))
  })

app.post('/api-users', (req, res) => {
    res.status(200).send("OK, " + req.body.lastname);
 });
 


app.post("/user", (req,res)=> {

    const user = {
        name: req.body.name,
        age: req.body.age
    };

    res.send(user.name +" " +user.age)
})

app.post("/multiply", (req,res)=>{
    const num = {
        a: parseInt(req.body.a),
        b: parseInt(req.body.b)
    };
    res.send(String(num.a*num.b))
})
app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
 
    const connection = await dbConn
    const rows = await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
    res.status(201).send(rows)
 })
 

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})

