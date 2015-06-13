function addLoadEvent(func){
    var oldload = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    } else{
        window.onload = function(){
            oldload();
            func();
        }
    }

}

function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value){
    if(!element.className){
        element.className = value;
    }else{
        newClassName = element.className;
        newClassName +=" ";
        newClassName +=value;
        element.className = newClassName;
    }
}

function highlightPage(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByTagName("header")) return false;
    var header = document.getElementsByTagName("header");
    if(header.length==0) return false;
    var navs =header[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links =navs[0].getElementsByTagName("a");
    var linkurl ;
    for(var i=0;i<links.length;i++){
        linkurl = links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }

    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
        return true;
    }
    if (xpos < final_x) {
        var dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        var dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        var dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        var dist = Math.ceil((ypos - final_y)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}


function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        links[i].onmouseover = function() {
            var destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300,0,5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview",-450,0,5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview",-600,0,5);
            }
        };
    }
}

function showsection(id){
    var section = document.getElementsByTagName("section");
    for(var i=0;i<section.length;i++){
        if(section[i].getAttribute("id")!=id){
            section[i].style.display = "none";
        }else{
            section[i].style.display = "block";
        }
    }
}

function prepareIntervalnav(){
    if(!document.getElementsByTagName) return false;
    if(!document.getElementsByName("article")) return false;
    var article =document.getElementsByTagName("article");
    if(article.length==0) return false;
    var navs =article[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var links = navs[0].getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        var sectionId = links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display ="none";
        links[i].destination = sectionId;
        links[i].onclick = function(){
            showsection(this.destination);
            //消除默认单击事件
            return false;
        };
    }
}

function preparePlaceHolder(){
    var Placeholder = document.createElement("img");
    Placeholder.setAttribute("id","placeholder");
    Placeholder.setAttribute("alt","my image gallery");
    Placeholder.setAttribute("src","images/placeholder.gif");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var textnode = document.createTextNode("Choose an image");
    description.appendChild(textnode);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(Placeholder,description);
}

function showpic(pic){
    if(!document.getElementById("placeholder")) return true;
    var placeholder = document.getElementById("placeholder");
    var source = pic.getAttribute("href");
    placeholder.setAttribute("src",source);
    if(pic.getAttribute("title")){
        var text = pic.getAttribute("tilte");
    }else{
        text = "";
    }
    if(!document.getElementById("description")) return false;
    var description = document.getElementById("description");
    if(description.firstChild.nodeType==3){
        description.firstChild.nodeValue = text;
    }
    return false;
}

function prepareGallery(){
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    var ul = document.getElementById("imagegallery");
    var links = ul.getElementsByTagName("a");
    for(var i=0;i<links.length;i++){
        links[i].onclick = function(){
           return showpic(this);
        }
    }
}

//function stripeTables(){
//    var table = document.getElementsByTagName("table");
//    for(var i=0;i<table.length;i++){
//        var odd = false;
//        var tr = table.getElementsByTagName("tr");
//        for(var j=0;j<tr.length;j++){
//            if(odd == true){
//                addClass(tr[j],"odd");
//                odd = false;
//            }else{
//                odd = true;
//            }
//        }
//    }
//}

function stripeTables(){
    if(!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for(var i=0;i<tables.length;i++){
        var tr = tables[i].getElementsByTagName("tr");
        for(var j=0;j<tr.length;j++){
            if(j%2 !=0){
                addClass(tr[j],"odd");
            }
        }
    }
}

function highlightRows(){
    var tr = document.getElementsByTagName("tr");
    for(var i=0;i<tr.length;i++){
        tr[i].oldclass = tr[i].className;
        tr[i].onmouseover = function () {
            addClass(this,"highlight");
        }
        tr[i].onmouseout = function () {
            this.className = this.oldclass;
        }
    }
}

function focuslabel(){
    if(!document.getElementById) return false;
    var labels = document.getElementById("label");
    for(var i=0;i<labels.length;i++){
        if(!labels[i].getAttribute("for")) continue;
        labels[i].onclick = function () {
            var id = this.getAttribute("for");
            if(!document.getElementById(id)) return false;
            var elem = document.getElementById(id);
            elem.onfocus();
        }
    }
}

function isFilled(field) {
    return (field.value.length > 1 && field.value != field.placeholder);
}

function isEmail(field){
    return (field.value.indexOf("@")!= -1 && field.value.indexOf(".") != -1);
}

//function ValidationForms(form){
//    for(var i=0;i<form.elements.length;i++){
//        var elem = form.elements[i];
//        if(elem.required == 'required'){
//            if(!isFilled(elem)){
//                alert("Please fill in the "+elem.name+" field");
//                return false;
//            }
//        }
//        if(elem.type == 'email'){
//            if(!isEmail(elem)){
//                alert("the email is valid!");
//                return false;
//            }
//        }
//    }
//    return true;
//}

function validateForm(whichform) {
    for (var i=0; i<whichform.elements.length; i++) {
        var element = whichform.elements[i];
        if (element.getAttribute("required") == 'required') {
            if (!isFilled(element)) {
                alert("Please fill in the "+element.name+" field.");
                return false;
            }
        }
        if (element.getAttribute("type") == 'email') {
            if (!isEmail(element)) {
                alert("The "+element.name+" field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}

function prepareform(){
    for(var i=0;i<document.forms.length;i++){
       var thisform = document.forms[i];
        thisform.onsubmit = function(){
            return validateForm(this);
        }
    }
}

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareIntervalnav);

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);

addLoadEvent(preparePlaceHolder);
addLoadEvent(prepareGallery);

addLoadEvent(focuslabel);
addLoadEvent(prepareform);
