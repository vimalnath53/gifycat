/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }
$("#SearchVal").focus();
$('#SearchVal').keydown(function(event){ 
    var keyCode = (event.keyCode ? event.keyCode : event.which);   
    if (keyCode == 13) {
        $('#searchGif').trigger('click');
    }
    if (keycode == 46) {
        return false;
      }
});
    $('#searchGif').click(function(){
        var searchStr = ($('#SearchVal').val()).trim();
       if (searchStr.match(/^[a-z0-9_.-\s]+$/i)) {
        if(searchStr == '') {
            alert("Please enter something.."); return false;
        }
        $(".spinner-border").show();
        //ajax function to call gifycat.
         $.ajax({
                    type: "GET",
                    url: 'result.php',
                    data: "searchval="+searchStr,
                    success: function(response) {
                        $('#grid').html('');
                        var json = JSON.parse(response);
                        for (var i = json["gfycats"].length - 1; i >= 0; i--) {
                            console.log(json["gfycats"][i].gif100px);
                            var img_str = json["gfycats"][i].gif100px;
                            var likes = json["gfycats"][i].likes;
                            var views = json["gfycats"][i].views;
                            $('#grid').append("<div class='mix col-sm-3 page1 page4 margin30'><div class='item-img-wrap'><img style='width:230px;height:200px;' src="+img_str+" class='img-responsive' id='myImg' alt='working'><div class='item-img-overlay'><a href='#' class='show-image'></a></div><p><img style='width:50px;' src='assets/like.png' />"+likes+" &nbsp;&nbsp;<img style='width:30px;' src='assets/view.png' />"+views+"</p></div></div>");
                            
                            $(".gallery-bottom").show();
                            $(".spinner-border").hide();
                        }
                    },
                    error: function() {
                        alert('There was some error performing the AJAX call!');
                    }
               });

          } else {
            alert("Enter valid characters to search");return false;
        }
        });

    $('#view_trending').click(function(){
        $(".spinner-border").show();
        $('.form-inline').html('');
        $('#grid').html('');
        $.ajax({
                    type: "GET",
                    url: 'result.php',
                    data: "searchval=view_trending",
                    success: function(response) {
                         $('#grid').html('');       
                        var json = JSON.parse(response);
                        for (var i = json["gfycats"].length - 1; i >= 0; i--) {
                            var img_str = json["gfycats"][i].gif100px;
                            var likes = json["gfycats"][i].likes;
                            var views = json["gfycats"][i].views;
                        $('#grid').append("<div class='mix col-sm-3 page1 page4 margin30'><div class='item-img-wrap'><img style='width:230px;height:200px;' src="+img_str+" class='img-responsive' id='myImg' alt='working'><div class='item-img-overlay'><a href='#' class='show-image'></a></div><p><img style='width:50px;' src='assets/like.png' />"+likes+" &nbsp;&nbsp; <img style='width:30px;' src='assets/view.png' />"+views+"</p></div></div>");
                        }
                        $(".gallery-bottom").show();
                        $(".spinner-border").hide();
                    },
                    error: function() {
                        alert('There was some error performing the AJAX call!');
                    }
               });
    });

});


