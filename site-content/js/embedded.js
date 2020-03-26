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
            return_message=null;
            break;
    }
    return return_message;
}

function show_button(subsid){
    let button_holder = document.getElementById('button-holder')
    let complete_link = "http://survey-d.dynata.com/survey/selfserve/53c/" +
            "brinebar?subsid=" + subsid;
    button_holder.innerHTML = "" +
        "<a href=\"" + complete_link + "\">" +
            "<button class=\"orange\" id=\"voted\" type=\"button\">" +
                "I've voted on all statements" +
            "</button>" +
        "</a>"
}

function set_subscriber(subsid) {
    let message = document.getElementById('message');
    if (typeof subsid === 'undefined'){
        message.innerHTML = print_messages('error');
    }else{
        message.innerHTML = print_messages('success');
        document.getElementById('polis-container').style.display = 'block';
        mouseListen(subsid, 'polis_3dzterdfcv');
    }
}


document.addEventListener('readystatechange', event => {
//    if (event.target.readyState === "interactive") {   //same as:  ..addEventListener("DOMContentLoaded".. and   jQuery.ready
//        alert("All HTML DOM elements are accessible");
//   }
    if (event.target.readyState === "complete") {
        let subsid = get_attribute('subsid');
        set_subscriber(subsid);
    }
});

function mouseListen(subsid, polisId){
    var eventListener = window.addEventListener('blur', function() {
        if (document.activeElement === document.getElementById(polisId)) {
            console.log("Click just happened");
            show_button(subsid);
            setTimeout(function(){ window.focus(); }, 0);
        }
        window.removeEventListener('blur', eventListener );
    });
}

