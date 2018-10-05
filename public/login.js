var er_uname = false;
var er_upass = false;
$(document).ready(() => {
    //hiding of the error tags for form elements 
    $('#uname_error').hide();
    $('#pswd_error').hide();
    //hiding of the correct tags for form elements
    $('#uname_corr').hide();
    $('#pswd_corr').hide();
    //to check username is valid or not
    $('#uname').focusout(function () {
        check_uname();
    });
    //to check password is valid or not
    $('#pswd').focusout(function () {
        check_pswd();
    });
    //to check if all fields are valid
    $('#btn').click(function () {
        check_inputs();
    });
    //username validation function
    function check_uname() {
        if ($('#uname').val() == '') {
            $('#uname_error').show();
            $('#uname_error').html('Please enter the username');
            $('#uname_corr').hide();
        }
        else {
            $('#uname_corr').show();
            $('#uname_corr').html('Entered');
            $('#uname_error').hide();
            er_uname = true;

        }
    }
    //password validation function
    function check_pswd() {
        if ($('#pswd').val() == '') {
            $('#pswd_error').show();
            $('#pswd_error').html('Please enter the password');
            $('#pswd_corr').hide();
        }
        else {
            $('#pswd_corr').show();
            $('#pswd_corr').html('Entered');
            $('#pswd_error').hide();
            er_upass = true;

        }
    }

    //code for checking if all the elements are there and registration
    function check_inputs() {
        if (er_uname && er_upass) {

            var funame = document.getElementById('uname').value;
            var fpswd = document.getElementById('pswd').value;
            $('#ubtn_corr').html('All fields are valid');
            $('#ubtn_corr').show();
            $('#ubtn_error').hide();
            $(document).ready(() => {
                $.post('/login/login', { username: funame, password: fpswd }, function (fobj) {

                    if (fobj.stat == true) {
                        $('#ubtn_corr').html('Login Successfull');
                        $('#ubtn_corr').show();
                        $('#ubtn_error').hide();
                        var url = '/userhome.html?id=' + fobj.id;
                        if(fobj.usertype=='user'){
                            window.location.href = url;
                            return false;
                        }
                        else{
                            window.location.href='/adminhome.html';
                        }
                       
                    }
                    else {
                        $('#ubtn_error').html('Login Failed');
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
