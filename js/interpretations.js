var interList = [];
var serverName = '/demo'
function pageReady() {
	console.log("Interpretations Page Ready");
	var userName;

    var interpretationUrl = serverName +"/api/interpretations";
	$.getJSON(serverName +"/api/me",function(data){
			
		var userName = data.name;

        $.ajax({
            url: interpretationUrl + '.json',
            type: 'GET',
            dataType: "json"
        })
            .done(function (data) {
                //alert("done: ");
                //console.log("--- page loaded ---\n" + data.interpretations[0].name);

                var parentDiv = document.getElementById("parentDiv");
                var hiddenBox = document.getElementById("hiddenBox");
                var newElement;
                var interpretationList = data.interpretations;

                for(var i= 0; i < interpretationList.length ; i ++){
                    console.log("Type of interpreation: " + interpretationList[i].type);
					if(interpretationList[i].type == "map" || interpretationList[i].type == "chart"){
						console.log("Type of interpreation: inside loop = " + interpretationList[i].type);
                        $.ajax({
                            url: interpretationList[i].href + '.json',
                            type: 'GET',
                            dataType: "json"
                        })
                        .done(function (interpretation) {
                            var id;
                            newElement = hiddenBox.cloneNode(true);
                            newElement.id = interpretation[interpretation.type].id;
                            id = interpretation[interpretation.type].id;

                            interList[id] = interpretation;

                            parentDiv.appendChild(newElement);

                            if(interpretation.user){
                                console.log("user key exist = " + interpretation.user.name);
                                $('#' + id).find('#postUser').html(interpretation.user.name);
                            } else {
                                $('#' + id).find('#postUser').html(userName);
                            }

                            $('#' + id).find('#fbShareBtn').attr("id", id);

                            var created = interpretation.created.toString();
                            created = created.substring(0,created.indexOf("T"));
                            $('#' + id).find('#postDate').html(created);

                            $('#' + id).find('#postText').html(interpretation.text);

                            $('#' + id).find('#postImg').attr("src",interpretation[interpretation.type].href + "/data");
                            var  url = "";
                            if(interpretation.type == "chart"){
								console.log("interpretation with chart id: " + interpretation.id);
                                url = "http://apps.dhis2.org/demo/dhis-web-visualizer/app/index.html?id="+ id;
                            } else if(interpretation.type == "map"){
								console.log("interpretation with map id: " + interpretation.id);
                                url = "http://apps.dhis2.org/demo/dhis-web-mapping/app/index.html?id="+ id;
                            }
                            $('#' + id).find('#postNativeUrl').attr("href",url);
                            $('#' + id).find('#postNativeUrl').attr("id", 'postNativeUrl_'+id);


                            var  uid;
                            if(interpretation.user){
                                     uid = interpretation.user.id;
                            } else {
                                     uid = "";
                            }
                            var systemSettingsUrl = serverName + '/api/systemSettings/'+ uid +'-fbUserId';
                            $.ajax({
                                url: systemSettingsUrl,
                                type: 'get',
                                contentType: 'text/plain'
                            })
                                .success(function(data) {
                                    $('#' + id).find('#postUserProfileLink').attr("href","https://www.facebook.com/"+data);
                                    var profilePicUrl;
                                    if(data == ""){
                                        profilePicUrl = "../loading.gif";
                                    } else {
                                        profilePicUrl = "https://graph.facebook.com/"+data+"/picture";
                                    }
                                    //console.log("data for fb id === " + profilePicUrl);
                                    $('#' + id).find('#userProfilePic').attr("src",profilePicUrl);

                                });

                            //alert($('#' + interpretation.id).attr('id'));
                            //alert($('#).attr('id'));

                        })
                        .fail(function(){
                            console.log("error fetching an interpretation object");
                         });
                    }
                }
            })
            .fail(function(){
                console.log("fail to get data");
            })
            .always(function(){

            });
	});
}

function shareOnFacebook(id){
    var fbUrl = $('#' + id).find('#postNativeUrl_'+id).attr("href");

    var post = interList[id];

    var picUrl = post[post.type].href + "/data";
    var description = post.text;


    console.log("fb post: "+ fbUrl +" === "+ picUrl + " === " +description);
    //var url = 'https://www.facebook.com/sharer/sharer.php?u=';
    //url += encodeURIComponent(fbUrl);
    //url += '&p[images][0]=' + encodeURIComponent(picUrl);
    //url +='&description=' + encodeURIComponent(description);
    url = 'http://www.facebook.com/sharer.php?s=100&p[title]='+encodeURIComponent('Click to view in DHIS2') + '&p[summary]=' + encodeURIComponent(description) + '&p[url]=' + encodeURIComponent(fbUrl) + '&p[images][0]=' + encodeURIComponent(picUrl);
    window.open(url, 'fbshare', 'width=640,height=320');

    //alert("share the post with id = " + id + " on facebook: " + url + " " + interList[id].href);


}