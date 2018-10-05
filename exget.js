$(document).ready( ()=> {
   var express=require('express');
   var app=express();
    $("#btn").click( ()=> {
        app.get("https://reqres.in/api/users?page=2",  (req,res)=> {
            console.log(obj);
            var tbl = "<table border=1><tr><th>Firstname</th><th>Lastname</th><th>Avatar</th></tr>";
            var op=_.map(obj.data,(element)=>{
                element.first_name=element.first_name.toUpperCase();
                return element;
            })
            for (i = 0; i < op.length; i++) {
                tbl += "<tr><td>" + op[i].first_name + "</td><td>" + op[i].last_name + "</td><td>" + op[i].avatar + "</td></tr>"
            }

            tbl += "</table>";
            document.getElementById("tbl").innerHTML = tbl;
        })
        res.send();

    })
})
