//App ID: 	240732082752389
//App Secret: 	00cc1d91979f5f454a6bbd938007df4

var saveData;
var serverName = '/demo';
function saveProfileData() {

    var firstName = document.getElementById("fName").value;
    var surname = document.getElementById("sName").value;
    //var userID = document.getElementById("userID").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var email = document.getElementById("email").value;
    var introduction = document.getElementById("intro").value;
    var jobTitle = document.getElementById("jobbTitle").value;
    var gender = document.getElementById("gender").value;
    var birthday = document.getElementById("birthday").value;
    var employer = document.getElementById("employedAt").value;
    var education = document.getElementById("education").value;
    var interests = document.getElementById("interests").value;
    var languages = document.getElementById("languages").value;


    var edited = '{"firstName":"' + firstName + '","surname":"' + surname + '","phoneNumber":"' + phoneNumber + '","email":"' + email + '","introduction":"' + introduction + '","jobTitle":"' + jobTitle + '","gender":"' + gender + '","birthday":"' + birthday + '","employer":"' + employer + '","education":"' + education + '","interests":"' + interests + '","languages":"' + languages + '"}';

    console.log(saveData);
    $.ajax({
        url: serverName + '/api/me/user-account',
        type: 'post',

        data: edited,
        dataType: 'json',
        contentType: 'application/json'
    }) .success(function (data) {         

            //alert("userId = "+data.userID);
        })
        .always(function () {

            //alert("Always");
        });
			alert("Data Saved Succesfully!");
            window.open('viewProfile.html', '_self');

}
function getProfileData() {


    $.ajax({
        url: serverName + '/api/me',
        type: 'GET',
        dataType: 'json'
    })
        .success(function (data) {

        })
        .always(function (data) {

            document.getElementById("name").value = data.name;
            document.getElementById("intro").value = data.introduction;
            document.getElementById("employedAt").value = data.jobTitle;
            document.getElementById("education").value = data.education;
            document.getElementById("interests").value = data.interests;
            //document.getElementById("nationality").value = data.introduction;
            document.getElementById("birthday").value = data.birthday;
            document.getElementById("gender").value = data.gender;

            document.getElementById("speaks").value = data.languages;
            document.getElementById("email").value = data.email;
            document.getElementById("phoneNumber").value = data.phoneNumber;
            document.getElementById("orgUnits").value = data.organisationUnits[0].name;
            document.getElementById("userRoles").value = data.userCredentials.userAuthorityGroups[0].name;
            getFaceBookId();


        });

}

function getProfileDataToEdit() {


    $.ajax({
        url: serverName + '/api/me/user-account',
        type: 'GET',
        dataType: 'json'
    })
        .success(function (data) {

        })
        .always(function (data) {

            saveData = data;

            document.getElementById("fName").value = data.firstName;
            document.getElementById("sName").value = data.surname;
            //document.getElementById("userID").value= data.userID;
            document.getElementById("phoneNumber").value = data.phoneNumber;
            document.getElementById("email").value = data.email;
            document.getElementById("intro").value = data.introduction;
            document.getElementById("jobbTitle").value = data.jobTitle;
            document.getElementById("gender").value = data.gender;
            document.getElementById("birthday").value = data.birthday;
            document.getElementById("employedAt").value = data.employer;
            document.getElementById("education").value = data.education;
            document.getElementById("interests").value = data.interests;
            document.getElementById("languages").value = data.languages;
            getFaceBookId();


            //var obj = JSON && JSON.parse(data) || $.parseJSON(data);

        });

}

function saveFaceBookId(fbUserID) {
    var userId;

    $.ajax({
        url: serverName + '/api/me',
        type: 'GET',
        dataType: 'json'
    })
        .success(function (data) {
            userId = data.id;
            var fbUserID = document.getElementById("userID").value;
            console.log("userid in savefbid is === " + userId);
            var ul = serverName + '/api/systemSettings/' + userId + '-fbUserId?value=' + fbUserID;

            $.ajax({
                url: ul,
                type: 'post',
                contentType: 'text/plain'
            })


                .success(function (data) {

                    //alert("Changes Saved!");

                })
                .fail(function () {

                    //alert("Error while saving facebook Id!");
                });

        })
        .fail(function () {

            alert("Error in key creation for facebook id!");
        });


}
function getFaceBookId() {
    var userId;

    $.ajax({
        url: serverName + '/api/me',
        type: 'GET',
        dataType: 'json'
    })
        .success(function (data) {
            userId = data.id;
            var ul = serverName + '/api/systemSettings/' + userId + '-fbUserId';

            $.ajax({
                url: ul,
                type: 'get',
                contentType: 'text/plain'
            })


                .success(function (data) {

                    document.getElementById("userID").value = data;
                    //document.getElementById("imageID").src = "https://graph.facebook.com/"+data+"/picture"

                })
                .fail(function () {
                    alert("Error to get facebook Id!");
                });

        })
        .fail(function () {
            alert("Error in fetching key of facebook id!");
        });
}

