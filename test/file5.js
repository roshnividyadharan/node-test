var er_name = false;
var er_job = false;
$(document).ready( ()=> {
    $("#name_error").hide();
    $("#job_error").hide();
    $("#name_corr").hide();
    $("#job_corr").hide();
    $("#name").keyup(function () {
        check_name();
    })
    $("#job").keyup(function () {
        check_job();
    })
    function check_name() {
        var pattern = new RegExp("^[a-zA-Z ]+$");
        if (pattern.test($("#name").val())) {
            $("#name_error").hide();
            $("#name_corr").html("valid name");
            $("#name_corr").show();
            er_name = true;


        }
        else {
            $("#name_error").html("Invalid name");
            $("#name_error").show();
            $("#name_corr").hide();

        }
    }
    function check_job() {
        var pattern = new RegExp("^[a-zA-Z ]+$");
        if (pattern.test($("#job").val())) {
            $("#job_error").hide();
            $("#job_corr").html("valid name");
            $("#job_corr").show();
            er_name = true;


        }
        else {
            $("#job_error").html("Invalid name");
            $("#job_error").show();
            $("#job_corr").hide();

        }
    }

    $("#btn").click(()=> {
        var Name = document.getElementById("name").value;
        var Job = document.getElementById("job").value;
        $.post("https://reqres.in/api/users",
            {
                name: Name,
                job: Job
            },
             (obj, status)=> {
                var dateTime=moment(obj.createdAt).format("MM-DD-YYYY HH:mm:ss");
                console.log(obj);
                var tbl = "<table border=1><tr><th>Name</th><th>Job</th><th>ID</th><th>Created Date</th></tr>";
                tbl += "<tr><td>" + obj.name + "</td><td>" + obj.job + "</td><td>" + obj.id + "</td><td>" + dateTime + "</td></tr>";
                tbl += "</table>";
                document.getElementById("tbl").innerHTML = tbl;
            })

    })
})