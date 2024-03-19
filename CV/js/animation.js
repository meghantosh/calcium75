// initialize variables
var $head = $("h1");
var $sub = $("h3");
var $allDivs = $("div");
var $btn = $("a.btn");

console.log($btn);

// set initial values
$head.velocity({ opacity: .2, translateY: -40}, { duration: 0 });
$sub.velocity({ opacity: 0, translateY: -20}, { duration: 0 });

//


$head.velocity({ opacity: 1, translateY: 0}, { duration: 700, easing: "ease-out" });
$sub.velocity({ opacity: 1, translateY: 0}, { duration: 600, easing: "ease-out" });


$btn.mousedown(function(){
  $(this).velocity({ 
    scale: ".8"
  }, 100, "easeOut").velocity({
    scale: "1",
  }, 150, "easeOut")
  

});



$allDivs.velocity();


$(document).ready(function() {
    // bind click event to all internal page anchors
    $("a[href*=#]").bind("click", function(e) {
        // prevent default action and bubbling
        e.preventDefault();
        e.stopPropagation();
        // set target to anchor's "href" attribute
        var target = $(this).attr("href");
        // scroll to each target
        $(target).velocity("scroll", {
            duration: 1000,
            easing: "swing"
        });
        
    });
});
