console.log('zachs js is working');

var $uName = $('#uName');
var $uPhone = $('#uPhone');
var $uEmail = $('#uEmail');
var $uStreet = $('#uStreet');
var $uCity = $('#uCity');
var $uState = $('#uState');
var $uZip = $('#uZip');


function uNameValid() {
	return $uName.val().length > 0;
}

function uPhoneValid() {
	var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;  
	return $uPhone.val().match(re);
}	

function uEmailValid() {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return $uEmail.val().match(re);
}

function uStreetValid() {
	return $uStreet.val().length > 0;
}

function uCityValid() {
	return $uCity.val().length > 1;
}

function uStateValid() {
	return $uState.val().length > 1;
}

function uZipValid() {
	var re = /\d{5}/;
	return $uZip.val().match(re);
}

function uNameEvent(){
	if(uNameValid()) {
		$uName.siblings('.valid').show();
		$uName.siblings('.invalid').hide();
		$uName.parent().removeClass('findInvalid');
		$uName.parent().next().hide();
	} else {
		$uName.siblings('.valid').hide();
		$uName.siblings('.invalid').show();
		$uName.parent().addClass('findInvalid');
	}
}

function uPhoneEvent(){
	if(uPhoneValid()) {
		$uPhone.siblings('.valid').show();
		$uPhone.siblings('.invalid').hide();
		$uPhone.parent().removeClass('findInvalid');
		$uPhone.parent().next().hide();
	} else {
		$uPhone.siblings('.valid').hide();
		$uPhone.siblings('.invalid').show();
		$uPhone.parent().addClass('findInvalid');
	}
}

function uEmailEvent(){
	if(uEmailValid()) {
		$uEmail.siblings('.valid').show();
		$uEmail.siblings('.invalid').hide();
		$uEmail.parent().removeClass('findInvalid');
		$uEmail.parent().next().hide();
	} else {
		$uEmail.siblings('.valid').hide();
		$uEmail.siblings('.invalid').show();
		$uEmail.parent().addClass('findInvalid');
	}
}

function uStreetEvent(){
	if(uStreetValid()) {
		$uStreet.siblings('.valid').show();
		$uStreet.siblings('.invalid').hide();
		$uStreet.parent().removeClass('findInvalid');
		$uStreet.parent().next().hide();
	} else {
		$uStreet.siblings('.valid').hide();
		$uStreet.siblings('.invalid').show();
		$uStreet.parent().addClass('findInvalid');
	}
}

function uCityEvent(){
	if(uCityValid()) {
		$uCity.siblings('.valid').show();
		$uCity.siblings('.invalid').hide();
		$uCity.parent().removeClass('findInvalid');
		$uCity.parent().next().hide();
	} else {
		$uCity.siblings('.valid').hide();
		$uCity.siblings('.invalid').show();
		$uCity.parent().addClass('findInvalid');
	}
}

function uStateEvent(){
	if(uStateValid()) {
		$uState.siblings('.valid').show();
		$uState.siblings('.invalid').hide();
		$uState.parent().removeClass('findInvalid');
		$uState.parent().next().hide();
	} else {
		$uState.siblings('.valid').hide();
		$uState.siblings('.invalid').show();
		$uState.parent().addClass('findInvalid');
	}
}

function uZipEvent(){
	if(uZipValid()) {
		$uZip.siblings('.valid').show();
		$uZip.siblings('.invalid').hide();
		$uZip.parent().removeClass('findInvalid');
		$uZip.parent().next().hide();
	} else {
		$uZip.siblings('.valid').hide();
		$uZip.siblings('.invalid').show();
		$uZip.parent().addClass('findInvalid');
	}
}

$uName.keyup(uNameEvent).blur(uNameEvent);
$uPhone.keyup(uPhoneEvent).blur(uPhoneEvent);
$uEmail.keyup(uEmailEvent).blur(uEmailEvent);
$uStreet.keyup(uStreetEvent).blur(uStreetEvent);
$uCity.keyup(uCityEvent).blur(uCityEvent);
$uState.keyup(uStateEvent).blur(uStateEvent);
$uZip.keyup(uZipEvent).blur(uZipEvent);

function validSubmit(){
	return uNameValid() &&
			uPhoneValid() &&
			uEmailValid() &&
			uStreetValid() &&
			uCityValid() &&
			uStateValid() &&
			uZipValid();
}

function postContactToGoogle() {
    var uName = $('#uName').val();
    var uPhone = $('#uPhone').val();;
    var uEmail = $('#uEmail').val();
    var uStreet = $('#uStreet').val();
    var uCity = $('#uCity').val();
    var uState = $('#uState').val();
    var uZip = $('#uZip').val();

    $.ajax({
        url: "https://docs.google.com/a/lyft.com/forms/d/1dvGi59-uYKX7K9wuN5hTrJTC-JBuAimBpdOwNIPk2gQ/formResponse",
        data: {
            "entry_491258003": uName,
            "entry.1498292447": uPhone,
            "entry.2092101998": uEmail,
            "entry.982850137": uStreet,
            "entry.1090323688": uCity,
            "entry.1236400270": uState,
            "entry.250384501": uZip
        },
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        success: function(data, textStatus, XMLHttpRequest) {
            // console.log("success");
            // console.log(data);
            $("#google_submit").hide(100);
            $("#submit-success").show(100);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // console.log("error");
            // console.log(textStatus);
            $("#google_submit").hide(100);
            $("#submit-success").show(100);
        },
    })
};

function showHelper(){
	$('.findInvalid').next().show();
	$('.findInvalid').children('.invalid').show();
}

function buttonEvent(){
	if(validSubmit()) {
		//SEND INPUT INFORMATION TO SERVER?//
		postContactToGoogle();
	} else {
		showHelper();
	}
}


$('#submitForm').click(buttonEvent);

document.querySelector( "form" ) .addEventListener( "invalid", function( event ) { event.preventDefault(); }, true );	