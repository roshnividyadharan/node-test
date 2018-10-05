$(document).ready(() => {
    //to list users on button click
    $('#btn').click(function () {
        list_Users();
    });

    //function to list users
    function list_Users() {
        $.post('/admin/listuser/listuser', function (obj) {
            var tbl = `<input type='text' id='search' placeholder='Search users..' >

            <table id='userTbl'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>User Type</th>
            </tr>`;
            if (obj.stat) {

                for (var i = 0; i < obj.count; i++) {
                    tbl += '<tr><td>' + obj.res[i].id + '</td><td>' + obj.res[i].name + '</td><td >' + obj.res[i].u_name + '</td><td>' + obj.res[i].u_pswd + `</td>
                    <td>` + obj.res[i].u_email + '</td><td>' + obj.res[i].u_addr + `</td>
                    <td>` + obj.res[i].u_phone + '</td><td>' + obj.res[i].user_type + `</td>
                    <td><input name='check' type='checkbox' id='chk[`+ i + ']\' value=\'' + obj.res[i].id + '\' /></td></tr>';
                }
                tbl += `</table><div id='del'> <input type='button' class=' btntwo' value='DELETE'  id='btndel' /></div></br>
               <input type='text' id='idadmin' placeholder='Enter id'/><input type='button' class=' btntwo' value='Give Admin Privilege'  id='btnadmin' /><p id='msg'></p>`;
                document.getElementById('tblshow').innerHTML = tbl;

            }
            else {
                alert('error');
            }
        });

    }
    //function to delete multiple rows checked using button click

    $(document).on('click', '#btndel', function () {
        var checkval=[];
        var i=0;
        var length;
        $('table').find('tr').each(function () {
            var row = $(this);
            if (row.find('input[type="checkbox"]').is(':checked')) {
                checkval[i]=row.find('input[name="check"]:checked').val();
                length=checkval.length;
                i++;
            }
        });
        
        alert(checkval);
       
        $.post('/admin/deluser/deluser', { 'check': length, 'value':checkval }, (objdel) => {
            if (objdel) {
                alert('Records deleted');
            }
            else {
                alert('Records not deleted ');
            }
        });

    });
    //function to provide admin privilege on button click
    $(document).on('click', '#btnadmin', function () {
        var adid = document.getElementById('idadmin').value;
        $.post('/admin/adminchange/adminchange', { id: adid }, function (chngobj) {
            if (chngobj) {
                document.getElementById('msg').innerHTML = 'Admin privilege provided';

            }
            else {
                alert('error');
            }
        });
    });
    //search 
    $('#search').on('keyup',function(){
        var searchTerm=$(this).val().toLowerCase();
        $('#userTbl tr  ').each(function(){
            var lineStr=$(this).text().toLowerCase();
            if(lineStr.indexof(searchTerm)===-1){
                $(this).hide();
            }
            else{
                $(this).show();
            }
        });

    });
  

});