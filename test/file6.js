$(document).ready(function () {
    $("#btn").click(function () {
         $.ajax({
            type: "PUT",
            url: "https://reqres.in/api/users/2",
            data:"name=morpheus&job=leader",
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success:function (obj) {
            console.log(obj);
            var tbl="<table border=1><tr><th>Firstname</th><th>Lastname</th><th>Updated Date</th></tr>";
                tbl+="<tr><td>"+obj.name+"</td><td>"+obj.job+"</td><td>"+obj.updatedAt+"</td></tr>";
                tbl+="</table>";
                document.getElementById("tbl").innerHTML=tbl;
            }
        })
    })
})
