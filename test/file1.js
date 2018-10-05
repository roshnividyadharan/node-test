function loadDoc() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 201) {
            var obj = JSON.parse(this.responseText);
            document.getElementById("tbl").innerHTML = obj;
            console.log(obj);
            var tbl = "<table border=1><tr><th>Firstname</th><th>Lastname</th><th>ID</th><th>Created Date</th></tr>";
            tbl += "<tr><td>" + obj.name + "</td><td>" + obj.job + "</td><td>" + obj.id + "</td><td>" + obj.createdAt + "</td></tr>";

            tbl += "</table>";
            document.getElementById("tbl").innerHTML = tbl;
        }
    }
    xhttp.open("POST", "https://reqres.in/api/users", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ name: "morpheus", job: "leader" }));

}
