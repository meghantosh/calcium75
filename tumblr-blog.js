window.onload=function(){
	var current_url = location.href;

	var r=document.createElement('script');
 	r.id='tumblr';
 	r.setAttribute('type','text/javascript');
 	r.setAttribute('src','http://www.calcium75.com/tumblrBadge-1.1.js');
 	var hd=document.getElementsByTagName('head')[0];
 	hd.appendChild(r);

	/* change "2394036" to your page / project ID */
 	document.getElementById('p2394036').onclick = load_blog; // YOU MUST EDIT THIS LINE
	var blog_link = current_url.search(/2394036/); // YOU MUST EDIT THIS LINE
	if ( blog_link > "-1" ) { load_blog(); }	
}

function load_blog() {
	setTimeout("load_timer()", 1000); //wait a bit until everything is loaded.
}

function load_timer() {
	var theBlogContent = document.getElementById('tumblr-badge'); //stupid IE!
	document.getElementById('blog').innerHTML = theBlogContent.innerHTML;
}