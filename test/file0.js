function loadDoc(){
       
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        
        if(this.readyState == 4 && this.status == 200){
            var obj=JSON.parse(this.responseText);
            console.log(obj);
            var tbl="<table border=1><tr><th>Firstname</th><th>Lastname</th><th>Avatar</th></tr>";
            for(i=0;i<obj.data.length;i++){
                tbl+="<tr><td>"+obj.data[i].first_name+"</td><td>"+obj.data[i].last_name+"</td><td>"+obj.data[i].avatar+"</td></tr>"                }
        }
        tbl+="</table>";
        document.getElementById("tbl").innerHTML=tbl;
    }
    xhttp.open("GET","https://reqres.in/api/users?page=2",true);
    xhttp.send();
   
}