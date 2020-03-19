function get_attribute(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}

function print_messages(role){
    let return_message;
    switch (role) {
        case 'error':
            return_message = "You seem to have got here by accident. " +
                "If you're looking for the Demos website, please " +
                "<a href=\"https://www.demos.co.uk\">click here</a>";
            break;
        case 'success':
            return_message = "<p>Successfully connected to Dynata.</p> " +
                "<p>You should be directed to Polis shortly. " +
                "If this doesn't happen, " +
                "<a href=\"https://pol.is/7dkr93h6ns\">click here.</a></p>";
            break;
    }
    return return_message;
}

function set_subs_cookie(subsid){
    let cookie_string = "max-age=86400;" +
        "subsid=" + subsid + ";" +
        "samesite=strict;path=/";
    document.cookie = cookie_string;
    console.log(document.cookie);
}

function set_subscriber() {
    var subsid = get_attribute('subsid');
    var message = document.getElementById('message');

    if (typeof subsid === 'undefined'){
        message.innerHTML = print_messages('error');
    }else{
        set_subs_cookie(subsid);
        console.log(document.cookie);
        message.innerHTML = print_messages('success');
    }
}

document.addEventListener('readystatechange', event => {
//    if (event.target.readyState === "interactive") {   //same as:  ..addEventListener("DOMContentLoaded".. and   jQuery.ready
//        alert("All HTML DOM elements are accessible");
//   }
    if (event.target.readyState === "complete") {
        set_subscriber();
    }
});

