var imgString;
var l;
var pswdFlag=false;
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

    var params = location.search.substring(1).split('&');
    var temp = params[0].split('=');
    l = temp[1];
    $.post('/user/userhome/userhome', { id: l }, (objf) => {
        document.getElementById('name').value = objf.rows[0].name;
        document.getElementById('uname').value = objf.rows[0].u_name;
        document.getElementById('pswd').value = objf.rows[0].u_pswd;
        document.getElementById('email').value = objf.rows[0].u_email;
        document.getElementById('addr').value = objf.rows[0].u_addr;
        document.getElementById('phone').value = objf.rows[0].u_phone;
        document.getElementById('header').innerHTML = 'Welcome ' + objf.rows[0].name + '';
        $('#imgUser')
            .attr('src', './images/' + objf.rows[0].id + '.jpg')
            .width(150)
            .height(150);

    });
    //to check name is valid or not
    $('#name').keyup(function () {
        check_name();
    });
    //to check username is valid or not
    $('#uname').keyup(function () {
        check_uname();
    });
    //to check username has only characters
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
    $('#email').focusout(function () {
        check_uemail();
    });
    //to check password is valid or not
    $('#addr').keyup(function () {
        check_addr();
    });
    //to check if phone number is valid or not
    $('#phone').keyup(function () {
        check_phone();
    });
    //to check all fields are valid before updating
    $('#btn').click(function () {
        update();
    });
    
    //name validation function
    function check_name() {
        var pattern = new RegExp('^[a-zA-Z ]+$');
        if (pattern.test($('#name').val())) {
            $('#name_error').hide();
            $('#name_corr').html('valid name');
            $('#name_corr').show(); 
        }
        else {
            $('#name_error').html('Invalid name');
            $('#name_error').show();
            $('#name_corr').hide();

        }
    }
    //username validation function
    function check_uname() {
        var useRname = document.getElementById('uname').value;
        $.post('/user/checkuname/checkuname', {
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
    //username validation function for only characters
    function check_uname1() {
        var patternuname = new RegExp('^[a-zA-Z ]+$');
        if (patternuname.test($('#uname').val())) {
            $('#uname_error').hide();
            $('#uname_corr').html('valid username');
            $('#uname_corr').show();
        }
        else {
            $('#uname_error').html('Invalid Username');
            $('#uname_error').show();
            $('#uname_corr').hide();

        }
    }
    //password validation function
    function check_pswd() {
        pswdFlag=true;
        var patternpswd = new RegExp();
        patternpswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d!@#$%^&*()_+=]{8,}$/;
        if (patternpswd.test($('#pswd').val())) {
            $('#pswd_error').hide();
            $('#pswd_corr').html('valid password');
            $('#pswd_corr').show();
        }
        else {
            $('#pswd_error').html('8 characters- one special character,number and alphabets');
            $('#pswd_error').show();
            $('#pswd_corr').hide();

        }
    }



    //email validation function
    function check_uemail() {
        var patternemail = new RegExp();
        patternemail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (patternemail.test($('#email').val())) {
            $('#email_error').hide();
            $('#email_corr').html('valid email');
            $('#email_corr').show();

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
        if (patternphone.test($('#phone').val())) {
            $('#phone_error').hide();
            $('#phone_corr').html('valid phone');
            $('#phone_corr').show();
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

        }


    }
    //password confirmation validation function
    function check_cpswd() {

        if ($('#pswd').val() == $('#cpswd').val()) {
            $('#cpswd_error').hide();
            $('#cpswd_corr').html('Matching');
            $('#cpswd_corr').show();
        }
        else {
            $('#cpswd_error').html('Passwords not matching');
            $('#cpswd_error').show();
            $('#cpswd_corr').hide();

        }
    }
    //function to upload image
    $('#imgUpload').on('change', function () {
        if (this.files && this.files[0]) {

            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgUser')
                    .attr('src', e.target.result)
                    .width(150)
                    .height(150);

            };
            reader.onloadend = function () {
                imgString = this.result;
                $.post('/user/imgUpload/imgUpload', { id: l, iMage: imgString }, () => {
                    console.log(imgString);
                });
            };
            reader.readAsDataURL(this.files[0]);
        }

    });



    // function to update details
    function update() {

        var nAme = document.getElementById('name').value;
        var uName = document.getElementById('uname').value;
        var uPass = document.getElementById('pswd').value;
        var uEmail = document.getElementById('email').value;
        var uAddress = document.getElementById('addr').value;
        var uPhone = document.getElementById('phone').value;
        $(document).ready(() => {

            //console.log(imgString);
            if(pswdFlag){
                $.post('/user/edit/edit', { name: nAme, username: uName, password: uPass, email: uEmail, address: uAddress, phone: uPhone, id: l, iMage: imgString }, (fobjj) => {
                    if (fobjj) {
    
                        window.location.href = '/userhome.html?id=' + l;
                        return false;
                    }
                    else {
    
                        $('#ubtn_error').html('Updation unsuccessful');
                        $('#ubtn_error').show();
                        $('#ubtn_corr').hide();
    
                    }
    
                }); 
            }
            else{
                $.post('/user/edit_all/edit_all', { name: nAme, username: uName, email: uEmail, address: uAddress, phone: uPhone, id: l, iMage: imgString }, (fobjj) => {
                    if (fobjj) {
    
                        window.location.href = '/userhome.html?id=' + l;
                        return false;
                    }
                    else {
    
                        $('#ubtn_error').html('Updation unsuccessful');
                        $('#ubtn_error').show();
                        $('#ubtn_corr').hide();
    
                    }
    
                });
            }
         
        });


        // }


    }
});

