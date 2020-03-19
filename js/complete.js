function get_attribute(name){
   if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
      return decodeURIComponent(name[1]);
}
function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    // Return null if not found
    return null;
}

document.addEventListener('readystatechange', event => {
//    if (event.target.readyState === "interactive") {   //same as:  ..addEventListener("DOMContentLoaded".. and   jQuery.ready
//        alert("All HTML DOM elements are accessible");
//   }
    if (event.target.readyState === "complete") {
        let dyn_link = "http://survey-d.dynata.com/survey/selfserve/53c/" +
            "brinebar?subsid=" + getCookie('subsid')
        document.getElementById('backlink').setAttribute('href', dyn_link)
    }
});

