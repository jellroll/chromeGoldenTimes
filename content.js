
// These names will eventually come from a database
var names = [   ["Donald J. Trump","Dorothy Zbornak"],
                ["Donald Trump","Dorothy Zbornak"],
                ["Mr. Trump","Ms. Zbornak"],
                ["Trump","Dorothy Zbornak"],
                ["Melania Trump","Frieda Claxton"],
                ["Melania","Frieda Claxton"],
                ["Michael Pence","Sophia Petrillo"],
                ["Mike Pence","Sophia Petrillo"],
                ["Mr. Pence","Mrs. Petrillo"],
                ["Pence","Petrillo"],
                ["Betsy Devos","Rose Nylund"],
                ["Devos","Nylund"],
                ["Ben Carson","Miles Webber"],
                ["Carson","Webber"],
                ["Jeff Sessions","Big Daddy Hollingsworth"],
                ["Sessions","Hollingsworth"],
                ["Nikki Haley","Blanche Devereaux"],
                ["Haley","Devereaux"],
                ["Steve Bannon","Mario Lopez (Dorothy's prized pupil who was deported)"],
                ["Bannon","Mario Lopez"],
                ["Jared Kushner","Little Michael Zbornak"],
                ["Kushner","Michael Zbornak"],
                ["Ivanka Trump","Barbara Thorndyke"],
                ["Ivanka","Barbara"],
                ["Scaramucci","Peterson"],
                ["Anthony Scaramucci","Arnie Peterson"],
                ["John Kelly","Truby Steele"],
                ["Mr. Kelly","Ms. Steele"],
                ["Sarah Huckabee Sanders","Bessie the Showbiz Chicken"],
                ["Sarah Sanders","Bessie the Showbiz Chicken"],
                ["Sanders","Bessie"],
                ["Mike Huckabee","Big Daddy Hollingsworth"],
                ["Huckabee","Big Daddy Hollingsworth"],
                ["Kellyanne Conway","Daisy the Sunshine Cadet (who stole Rose's teddy bear)"],
                ["Conway","Daisy"],
                ["Vladimir V. Putin", "Coco the Gay Cook (who lasted only one episode)"],
                ["Vladimir Putin", "Coco the Gay Cook (who lasted only one episode)"],
                ["Putin","Coco the Gay Cook"],
                ["Kim Jong-un","Johnny No-Thumbs"],
                ["Kim Jong un","Johnny No-Thumbs"],
                ["Jong-un","No-Thumbs"],
                ["Rex Tillerson","Dreyfuss the Dog"],
                ["Tillerson","Dreyfuss"],
                ["Jong-un","No-Thumbs"],
                ["Stephen Miller","Raoul (Sophia's date to the banquet)"],
                ["Miller","Raoul"],
                ["Robert Mueller","Al Mullens"],
                ["Robert S. Mueller","Al Mullens"],
                ["Mueller","Mullens"],
                ["James Comey","Bobby Hopkins"],
                ["Comey","Hopkins"],
                ["Neil Gorsuch","Little Sven from Sweden"],
                ["Mr. Gorsuch","Little Sven"],
                ["Gorsuch","Sven"],
                ["Paul Ryan","Bobby Hopkins (played by a young George Clooney)"],
                ["Ryan","Bobby Hopkins (a.k.a. George Clooney)"],
                ["Mitch McConnell","Ham Lushbaugh"],
                ["McConnell ","Lushbaugh"],
                ["Andrew McCabe ","Enrique Mas"],
                ["McCabe","Mas"],
                ["James Mattis","Enrique Mas"],
                ["Mattis","Mas"],
                ["Eric Hargan", "Sophia's friend Lillian (who couldn't afford a safe nursing home)"],
                ["Mr. Hargan", "Ms. Lillian"],
                ["Washington, D.C.","St. Olaf"],
                ["The Capitol","St. Olaf"],
                ["Capitol Hill","St. Olaf"],
                ["Pentagon","Rusty Anchor"],
                ["The White House","Shady Pines"],
                ["White House","Shady Pines"],
                ["Pennsylvania Avenue","Biscayne Boulevard"],
            ];


chrome.runtime.sendMessage({checkForEnabled: "Performing a check"}, function(response) {
    var enabled = response.enabled;
    toggle(enabled);
});
    


function toggle(enabled) {

    var elements = document.getElementsByTagName('*');

        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];

            for (var k = 0; k < element.childNodes.length; k++) {
                var node = element.childNodes[k];

                if (node.nodeType === 3) {
                    // replaceNames(node, element, beforeName, afterName, enabled);
                    replaceNames(node, enabled);
                }
            }
        }
    
    if (enabled) {
        replacePhotos();
    } else {
        //removePhotos();
    }
}




function replacePhotos() {

    const galleryUrl = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=714d94e01a2f8290b2e404dc4e4da6a3&gallery_id=152943881-72157686071664832&extras=url_m&format=json&nojsoncallback=1";

    let theGirlsPhotos = [];
    
    $.getJSON(galleryUrl, function(data) {
        $.each(data.photos.photo, function(i,item){
            theGirlsPhotos.push(item.url_m);
        });
    
        console.log("theGirlsPhotos.length: " + theGirlsPhotos.length);
        
        //var images = document.getElementsByTagName('img');
        var images = document.querySelectorAll("img","figure");        
        
        let photoIndex = 0;

        for (var i = 0, l = images.length; i < l; i++) {
            
            //if ($(images[i]).attr('class').indexOf('logo')) {
            
            //if (!$(images[i]).hasClass("main-logo")) {
            if (!$(images[i]).hasClass("main-logo") && !$(images[i]).hasClass("wplogo")) {
                
                    // remove lazyloader attributes otherwise these pics get loaded after DOM load
					if (images[i].hasAttribute('data-src')){
						images[i].removeAttribute('data-src');	
					};
					if (images[i].hasAttribute('data-hi-res-src')){
						images[i].removeAttribute('data-hi-res-src');	
					};
					if (images[i].hasAttribute('data-low-res-src')){
						images[i].removeAttribute('data-low-res-src');	
					};
                
                
                    photoIndex = Math.floor(Math.random() * 50) + 0; // 50 total in the gallery 
                    images[i].src = theGirlsPhotos[photoIndex];
            }
            

        }
    });
}

function removePhotos() {
    
    
    var images = document.getElementsByTagName('img');
    
    for (var i = 0, l = images.length; i < l; i++) {    
        images[i].src = "";
    }
}

// function replaceNames(node, element, before, after, enabled) {
function replaceNames(node, enabled) {

    var beforeName;
    var afterName;

    for (var i = 0; i < names.length; i++) {        

        if (enabled) {
            beforeName = names[i][0];
            afterName = names[i][1];
        } else {
            beforeName = names[i][1];
            afterName = names[i][0];
        }
        
        //alert("in replaceNames, node.nodeValue: " + node.nodeValue);
        var text = node.nodeValue;
    
        var regExInput = new RegExp(beforeName, "gi");
        var replacedText = text.replace(regExInput, afterName); 
        
        if (enabled) {
            if (text == text.toUpperCase()) {
                replacedText.toUpperCase();
            } 
        }
    
        if (replacedText !== text) {
            //element.replaceChild(document.createTextNode(replacedText), node);
            node.nodeValue = replacedText;
        } else {
            //alert("in the else, we changed nothing!");
        }       
    }
}








