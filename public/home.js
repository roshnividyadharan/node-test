var er_name = false;
var er_uname = false;
var er_upass = false;
var er_cupass = false;
var er_uemail = false;
var er_uphone = false;
var er_addr = false;
$(document).ready(() => {
    //hiding of the error tags for form elements 
    $('#name_error').hide();
    $('#uname_error').hide();
    $('#pswd_error').hide();
    $('#cpswd_error').hide();
    $('#email_error').hide();
    $('#phone_error').hide();
    $('#addr_error').hide();
    $('ubtn_error').hide();
    //hiding of the correct tags for form elements
    $('#name_corr').hide();
    $('#uname_corr').hide();
    $('#pswd_corr').hide();
    $('#cpswd_corr').hide();
    $('#email_corr').hide();
    $('#phone_corr').hide();
    $('#addr_corr').hide();
    $('#ubtn_corr').hide();


    //to check name is valid or not
    $('#name').keyup(function () {
        check_name();
    });
    //to check username is valid or not
    $('#uname').keyup(function () {
        check_uname();
    });
    //to check username is valid or not
    $('#uname').focusout(function () {
        check_uname1();
    });
    //to check password is valid or not
    $('#pswd').focusout(function () {
        check_pswd();
    });
    //to re check password is valid or not
    $('#cpswd').focusout(function () {
        check_cpswd();
    });
    //to check email is valid or not
    $('#u_email').focusout(function () {
        check_uemail();
    });
    //to check password is valid or not
    $('#addr').keyup(function () {
        check_addr();
    });
    //to check if phone number is valid or not
    $('#u_phone').keyup(function () {
        check_phone();
    });

    //to check if all fields are valid
    $('#btn').click(function () {
        check_inputs();
    });
    //name validation function
    function check_name() {
        var pattern = new RegExp('^[a-zA-Z ]+$');
        if (pattern.test($('#name').val())) {
            $('#name_error').hide();
            $('#name_corr').html('valid name');
            $('#name_corr').show();
            er_name = true;


        }
        else {
            $('#name_error').html('Invalid name');
            $('#name_error').show();
            $('#name_corr').hide();

        }
    }
    //username validation function
    function check_uname() {
        var patternuname = new RegExp('^[a-zA-Z ]+$');
        if (patternuname.test($('#uname').val())) {
            $('#uname_error').hide();
            $('#uname_corr').html('valid username');
            $('#uname_corr').show();
            er_uname = true;
        }
        else {
            $('#uname_error').html('Invalid Username');
            $('#uname_error').show();
            $('#uname_corr').hide();

        }
    }
    //username validation function
    function check_uname1() {
        var useRname = document.getElementById('uname').value;
        $.post('/register/checkuname/checkuname', {
            username: useRname
        }, (obj) => {
            if (obj) {
                $('#uname_error').hide();
                $('#uname_corr').html('valid username');
                $('#uname_corr').show();
            }
            else {
                $('#uname_error').html('Invalid Username');
                $('#uname_error').show();
                $('#uname_corr').hide();
            }

        });

    }
    //password validation function
    function check_pswd() {
        var patternpswd = new RegExp();
        patternpswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+=]{8,}$/;
        //patternpswd = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':'\\|,.<>\/?]).{8,}$/;

        if (patternpswd.test($('#pswd').val())) {
            $('#pswd_error').hide();
            $('#pswd_corr').html('valid password');
            $('#pswd_corr').show();
            er_upass = true;
        }
        else {
            $('#pswd_error').html('8 characters- one special character,number and alphabets');
            $('#pswd_error').show();
            $('#pswd_corr').hide();

        }
    }

    //password confirmation validation function
    function check_cpswd() {

        if ($('#pswd').val() == $('#cpswd').val()) {
            $('#cpswd_error').hide();
            $('#cpswd_corr').html('Matching');
            $('#cpswd_corr').show();
            er_cupass = true;
        }
        else {
            $('#cpswd_error').html('Passwords not matching');
            $('#cpswd_error').show();
            $('#cpswd_corr').hide();

        }
    }
    //email validation function
    function check_uemail() {
        var patternemail = new RegExp();
        patternemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (patternemail.test($('#u_email').val())) {
            $('#email_error').hide();
            $('#email_corr').html('valid email');
            $('#email_corr').show();
            er_uemail = true;

        }
        else {
            $('#email_error').html('Invalid Email');
            $('#email_error').show();
            $('#email_corr').hide();
        }
    }
    //phone number validation function
    function check_phone() {
        var patternphone = new RegExp();
        patternphone = /^[0-9]{11}$/;
        if (patternphone.test($('#u_phone').val())) {
            $('#phone_error').hide();
            $('#phone_corr').html('valid phone');
            $('#phone_corr').show();
            er_uphone = true;
        }
        else {
            $('#phone_error').html('Invalid Phone-11 digit phone number');
            $('#phone_error').show();
            $('#phone_corr').hide();

        }
    }

    //address validation function
    function check_addr() {
        if ($('#addr').val() == '') {
            $('#addr_error').show();
            $('#addr_error').html('Please enter the address');
            $('#addr_corr').hide();
        }
        else {
            $('#addr_corr').show();
            $('#addr_corr').html('Address filled');
            $('#addr_error').hide();
            er_addr = true;

        }


    }

    //code for checking if all the elements are there and registration
    function check_inputs() {
        if (er_name && er_uname && er_upass && er_cupass && er_uemail && er_uphone && er_addr) {
            var fname = document.getElementById('name').value;
            var funame = document.getElementById('uname').value;
            var fpswd = document.getElementById('pswd').value;
            var femail = document.getElementById('u_email').value;
            var faddr = document.getElementById('addr').value;
            var fphone = document.getElementById('u_phone').value;
            //var fobj = { name: fname, username: funame, password: fpswd, email: femail, address: faddr, phone: fphone };
            $('#ubtn_corr').html('All fields are valid');
            $('#ubtn_corr').show();
            $('#ubtn_error').hide();
            $(document).ready(() => {
                $.post('/register/register', { name: fname, username: funame, password: fpswd, email: femail, address: faddr, phone: fphone }, function (fobj) {

                    if (fobj) {
                        $('#ubtn_corr').html('Registration Successfull');
                        $('#ubtn_corr').show();
                        $('#ubtn_error').hide();
                        window.location.href = '/login.html';
                        return false;
                    }
                    else {
                        $('#ubtn_error').html('Username already exists');
                        $('#ubtn_error').show();
                        $('#ubtn_corr').hide();

                    }

                });
            });


        }
        else {
            $('#ubtn_error').html('All fields are mandatory');
            $('#ubtn_error').show();
            $('#ubtn_corr').hide();
        }
    }


});


