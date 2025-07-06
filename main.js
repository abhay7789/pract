const express=require('express')
const app=express()
require('dotenv').config()
const port=process.env.PORT || 3000;
const users= require('./MOCK_DATA.json')

app.get('/',(req,res)=>{
    res.send(`<h>Welcom to the Practice Backend API of Node js with Latest Express</h>
        <p>Server is running at port ${port}</p>`)
})

app.get('/api',(req,res)=>{
    res.send(`<h>Welcome to the API center of Node Express Server.</h>`)
})

app.get('/api/getAllUsers',(req,res)=>{
    res.json(users);
})

app.get('/api/getAllUserNames',(req,res)=>{
    res.send(`<h1>User list</h1>
    <ul>
        ${users.map(user=>
            `<li><br><b>User Id:</b>${user.id}
                <br><b>First Name:</b>${user.first_name}
                <br><b>Last Name:</b> ${user.last_name}
                <br><b>Email Id:</b>${user.email}
                <br><b>Gender:</b> ${user.gender}
                <br><b>User Exist:</b> ${user.is_active ? `Active` : `User Deleted`}</li><br>`
        ).join("")}
    </ul>`)
})

app.get('/api/getUserById/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>{
        return user.id===id
    })
    console.log(user);
    res.send(`<h1>User</h1>
    <ul>
    <li>
        <br><b>User Id:</b>${user.id}
        <br><b>First Name:</b>${user.first_name}
        <br><b>Last Name:</b> ${user.last_name}
        <br><b>Email Id:</b>${user.email}
        <br><b>Gender:</b> ${user.gender}
        <br><b>User Exist:</b> ${user.is_active ? `Active` : `User Deleted`}</li><br>
    </ul>`)
})

app.delete('/api/deleteUserById/:id',(req,res)=>{
    const id=Number(req.params.id);
    const popUser=users.find(user=>user.id===id)
    console.log(popUser);
    users.pop(popUser);
    res.send(`User with id ${id} deleted`)
})

app.listen(port,()=>{
    console.log(`Backend Server is running at port: ${port}`);
})