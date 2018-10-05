//setting errors of form elements to false
var er_name = false;
var er_uname = false;
var er_upass = false;
var er_uemail = false;
var er_uphone = false;
$(document).ready(function () {

    //hiding of the error tags for form elements 
    $("#name_error").hide();
    $("#uname_error").hide();
    $("#upass_error").hide();
    $("#uemail_error").hide();
    $("#uphone_error").hide();
    $("ubtn_error").hide();
    //hiding of the error tags for form elements
    $("#name_corr").hide();
    $("#uname_corr").hide();
    $("#upass_corr").hide();
    $("#uemail_corr").hide();
    $("#uphone_corr").hide();
    $("#ubtn_corr").hide();


    //to check name is valid or not
    $("#name").keyup(function () {
        check_name();
    })
    //to check username is valid or not
    $("#uname").keyup(function () {
        check_uname();
    })
    //to check password is valid or not
    $("#pswd").keyup(function () {
        check_pswd();
    })
    //to check email is valid or not
    $("#u_email").keyup(function () {
        check_uemail();
    })
    //to check if phone number is valid or not
    $("#u_phone").keyup(function () {
        check_phone();
    })
    //to check if all fields are valid
    $("#btn").click(function () {
        check_inputs();
    })

    //name validation function
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
    //username validation function
    function check_uname() {
        var patternuname = new RegExp("^[a-zA-Z ]+$");
        if (patternuname.test($("#uname").val())) {
            $("#uname_error").hide();
            $("#uname_corr").html("valid username");
            $("#uname_corr").show();
            er_uname = true;
        }
        else {
            $("#uname_error").html("Invalid Username");
            $("#uname_error").show();
            $("#uname_corr").hide();

        }
    }
    //password validation function
    function check_pswd() {
        var patternpswd = new RegExp();
        patternpswd = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
        if (patternpswd.test($("#pswd").val())) {
            $("#upass_error").hide();
            $("#upass_corr").html("valid password");
            $("#upass_corr").show();
            er_upass = true;
        }
        else {
            $("#upass_error").html("8 characters long with atleast one special character,number and alphabets");
            $("#upass_error").show();
            $("#upass_corr").hide();

        }
    }
    //email validation function
    function check_uemail() {
        var patternemail = new RegExp();
        patternemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (patternemail.test($("#u_email").val())) {
            $("#uemail_error").hide();
            $("#uemail_corr").html("valid email");
            $("#uemail_corr").show();
            er_uemail = true;

        }
        else {
            $("#uemail_error").html("Invalid Email");
            $("#uemail_error").show();
            $("#uemail_corr").hide();
        }
    }
    //phone number validation function
    function check_phone() {
        var patternphone = new RegExp();
        patternphone = /^[0-9]{11}$/;
        if (patternphone.test($("#u_phone").val())) {
            $("#uphone_error").hide();
            $("#uphone_corr").html("valid phone");
            $("#uphone_corr").show();
            er_uphone = true;
        }
        else {
            $("#uphone_error").html("Invalid Phone");
            $("#uphone_error").show();
            $("#uphone_corr").hide();

        }
    }
    //code for checking if all the elements are there
    function check_inputs() {
        if (er_name && er_uname && er_upass && er_uemail && er_uphone) {
            var fname = document.getElementById("name").value;
            var funame = document.getElementById("uname").value;
            var fpswd = document.getElementById("pswd").value;
            var femail = document.getElementById("u_email").value;
            var fphone = document.getElementById("u_phone").value;
            var fobj = { name: fname, username: funame, password: fpswd, email: femail, phone: fphone };
            console.log(fobj);
            $("#ubtn_corr").html("All fields are valid");
            $("#ubtn_corr").show();
            $("#ubtn_error").hide();


        }
        else {
            $("#ubtn_error").html("All fields are mandatory");
            $("#ubtn_error").show();
            $("#ubtn_corr").hide();
        }
    }



});
