const POLIS_ID='7dkr93h6ns';

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

function activate_button(subsid) {
    let voted_button = document.getElementById('voted');
    let complete_link = "http://survey.researchnow.co.uk/webprod/resources/" +
        "PanelSample/subsidRedirectDecipher.php?SubsId=" + subsid;
    let help_text = document.getElementById('help-note');

    voted_button.parentElement.setAttribute("href", complete_link);
    voted_button.setAttribute("class", 'orange');
    help_text.setAttribute('class', 'hidden');
}

function show_button(){
    let voted_button = document.getElementById('voted');
    let help_text = document.getElementById('help-note');
    voted_button.setAttribute('class', 'grey');
    help_text.removeAttribute('class');
}

function set_subscriber(subsid) {
    let message = document.getElementById('message');
    if (typeof subsid === 'undefined'){
        message.innerHTML = print_messages('error');
    }else{
        message.innerHTML = print_messages('success');
        document.getElementById('polis-container').style.display = 'block';
        mouseListen(subsid, 'polis_' + POLIS_ID);
        show_button();
    }
}


document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "complete") {
        let subsid = get_attribute('subsid');
        set_subscriber(subsid);
    }
});

function mouseListen(subsid, polisId){
    let userClicks = 0;
    let eventListener = window.addEventListener('blur', function() {
        if (document.activeElement === document.getElementById(polisId)) {
            console.log("Click just happened");
            userClicks += 1;
            if (userClicks >= 10){
                activate_button(subsid);
            } else {
                setTimeout(function(){ window.focus(); }, 0);
            }
        }
        window.removeEventListener('blur', eventListener );
    });
}
