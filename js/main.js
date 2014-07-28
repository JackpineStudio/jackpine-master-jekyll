function login(e){

	data = new Object();
	data.pass = $('#password_box').val();
	$.ajax({
		url: '/jekyll/_site/phscripts/login.php',
		type: 'post',
		data: data,
		success: function(e){
			if (e == 1){
				location.reload();
			}
		},
		error: function(e){
		}
	});

	e.preventDefault();

}


function submit_blog_edit(e){

	var data = new Object();
	data.text = $('.edit_blog_textarea').val();
	
	data.title = $('.edit_blog_textarea').attr('data-title');
	if (typeof data.title == 'undefined' || data.title == ""){
		var ntitle = $('#new_blog_title').val();
		var d = new Date();
		var month = d.getMonth() + 1;
		var day = d.getDate();
		if (month < 10){ month = '0' + month; }
		if (day < 10){ day = '0' + day; }

		data.title = d.getFullYear() + '-' + month + '-' + day + '-' + ntitle + '.textile';
	}

	$.ajax({
		url: '/jekyll/_site/phscripts/save_blog_entry.php',
		type: 'post',
		data: data,
		success: function(e){
		},
		error: function(e){

		}

	});

}
function edit_blog_entry(e){
	var data = new Object();
	data.title = $(this).text();
	var saved_title = data.title;
	$.ajax({

		url:'/jekyll/_site/phscripts/get_one_blog.php',
		type: 'post',
		data: data,
		success: function(e){
			$('#edit-blog-zone').empty();
			$('#edit-blog-zone').append('<input type="button" class="jbutton submit_blog_edit" value="Edit" /><textarea data-title="'+saved_title+'" class="edit_blog_textarea">' + e + '</textarea>');
			$('.submit_blog_edit').on('click',submit_blog_edit);
		},
		error: function(e){

		}

	});

}
function logout(e){

	$.ajax({

		url:'/jekyll/_site/phscripts/logout.php',
		type: 'post',
		success: function(e){
			location.reload();
				},
		error: function(e){

		}

	});


}
function add_blog_entry(e){
	
	$('#edit-blog-zone').empty();
	$('#edit-blog-zone').append('<input type="button" class="jbutton submit_blog_edit" value="Add" /><label for="new_blog_title">Title</label><input type="text" id="new_blog_title" /><textarea class="edit_blog_textarea"></textarea>');
	$('.submit_blog_edit').on('click',submit_blog_edit);
	e.preventDefault();

}
function session_check(){
	$.ajax({
		url: '/jekyll/_site/phscripts/session.php',
		type: 'post',
		success: function(e){
			if (e == '-1'){
				$('#edit-blog .project').append('<div class="col-xs-12 col-sm-12 col-md-12" ><h2>Login</h2></div><div class="view-work col-xs-12 col-sm-12 col-md-12 col-lg-12"><input type="password" placeholder="Password" id="password_box" /><a href="#" class="button jpbutton password_submit">Submit</a></div>');
		$('.password_submit').on('click',login);
			}else if(e == 1){
				$('#jp-main-nav').append('<li><a href="#" id="logout">Logout</a></li>');
				$('#logout').on('click',logout);
				$.ajax({
					url: '/jekyll/_site/phscripts/get_blog_posts.php',
					type: 'post',
					dataType: 'json',
					success: function(e){
						var len = e.length;
						for (var i = 0; i < len; i++){
						$('#edit-blog .project').append('<div class="edit_blog_entry col-xs-12 col-sm-12 col-md-12 col-lg-12"><a href="#">' + e[i] + '</a></div>');
						}
						$('#edit-blog .project').prepend('<div class="add_blog_entry col-xs-12 col-sm-12 col-md-12 col-lg-12"><a href="#" class="add_blog_entry" >Add Blog Entry</a>');
						$('.edit_blog_entry a').on('click',edit_blog_entry);

						$('.add_blog_entry').off('click');	
						$('.add_blog_entry').on('click',add_blog_entry);	
					},
					error: function(e,b){
					}
				});	
			}
		},
		error: function(e){
		}

	});
}
$( function() {
  $( '.menu .toggle' ).click( function( e ) {
    e.preventDefault();
    $( '.menu nav' ).slideToggle( 300);
  });
	if ($('#front-page').length > 0){
		$('footer').css('position','fixed');
		$('footer').css('bottom','0');
	}

	if ($('#services').length > 0){
		$('header').attr('style','');
	}

	if ($('#edit-blog').length > 0){
		session_check();
	}

	if($('#jcam').length > 0){


	$.ajax({
		url: '/jekyll/_site/phscripts/get_cams.php',
		type: 'post',
		async: 'false',
		success: function(data){
			var go = JSON.parse(data);
			$('#skin-box').empty();
			$('#skin-box').append(go);
		},
		error: function(data){
		}

	});

	var sayCheese = new SayCheese('#camera_box', { snapshots: true });
		$('#gogo').on('click',function(e){
			sayCheese.takeSnapshot();
	
			e.preventDefault();
		});


	sayCheese.on('error', function(error) {
		 // handle errors, such as when a user denies the request to use the webcam,
		 // or when the getUserMedia API isn't supported
		});

sayCheese.on('snapshot', function(snapshot) {
	  // do something with a snapshot canvas element, when taken
	var dataurl = snapshot.toDataURL();
	$('#skin-box').prepend('<img class="skin-img" src="' + dataurl + '" />');
	
	if ($('#skin-box img').length > 28){
		$('#skin-box img').last().remove();
	}
	var data = new Object();
	data.box = $('#skin-box').html();
	
	$.ajax({
		url: '/jekyll/_site/phscripts/save_cams.php',
		type: 'post',
		async: 'false',
		data: data,
		success: function(data){
		},
		error: function(data){
		}

	});

	
});
sayCheese.start();

	}
	


  // window.addEventListener( 'scroll', scroll );
});
