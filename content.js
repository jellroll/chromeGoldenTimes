
// These names will eventually come from a database
var names = [   ["POTUS","Dorothy Zbornak"],
                ["Donald J. Trump","Dorothy Zbornak"],
                ["Donald Trump","Dorothy Zbornak"],
                ["Mr. Trump","Ms. Zbornak"],
                ["Trump","Dorothy Zbornak"],
                ["Melania Trump","Cousin Magda Yitchinson"],
                ["Melania","Cousin Magda"],
                ["Mrs. Trump","Cousin Magda"],
                ["FLOTUS","Cousin Magda"],
                ["Michael Pence","Stanley Zbornak"],
                ["Mike Pence","Stan Zbornak"],
                ["Mr. Pence","Mr. Zbornak"],
                ["Pence","Stanley Zbornak"],
                ["Betsy Devos","Rose Nylund"],
                ["Devos","Nylund"],
                ["Ben Carson","Miles Webber"],
                ["Carson","Webber"],
                ["Jeff Sessions","Big Daddy Hollingsworth"],
                ["Sessions","Big Daddy Hollingsworth"],
                ["Nikki Haley","Frieda Claxton"],
                ["Haley","Claxton"],
                ["Steve Bannon","Mario Lopez (Dorothy's prized pupil)"],
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
                ["Mike Huckabee","Dreyfuss the Dog"],
                ["Huckabee","Dreyfuss"],
                ["Kellyanne Conway","Daisy the Sunshine Cadet"],
                ["Conway","Daisy"],
                ["Vladimir V. Putin", "Coco the Gay Cook"],
                ["Vladimir Putin", "Coco the Gay Cook"],
                ["Putin","Coco the Gay Cook"],
                ["Kim Jong-un","Johnny No-Thumbs"],
                ["Kim Jong un","Johnny No-Thumbs"],
                ["Jong-un","No-Thumbs"],
                ["Rex Tillerson","Rex Huntington"],
                ["Tillerson","Huntington"],
                ["Jong-un","No-Thumbs"],
                ["Stephen Miller","Raoul (Sophia's date to the banquet)"],
                ["Miller","Raoul"],
                ["Robert Mueller","Detective Sergeant Al Mullens"],
                ["Robert S. Mueller","Detective Sergeant Al Mullens"],
                ["Special Counsel Mueller","Detective Sergeant Mullens"],
                ["Special Counsel Robert Mueller","Detective Sergeant Mullens"],
                ["Special Counsel Robert S. Mueller","Detective Sergeant Mullens"],
                ["Mr. Mueller","Detective Sergeant Mullens"],
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
        
    var images = document.querySelectorAll("img", "figure");        
        
    for (var i = 0, l = images.length; i < l; i++) {
            
        if (!$(images[i]).hasClass("main-logo") && !$(images[i]).hasClass("wplogo")) {
                
            // remove lazyloader attributes otherwise these pics get loaded after DOM load
            if (images[i].hasAttribute('data-src')){
				images[i].removeAttribute('data-src');	
            }
            if (images[i].hasAttribute('data-hi-res-src')){
				images[i].removeAttribute('data-hi-res-src');	
            }
            if (images[i].hasAttribute('data-low-res-src')){
				images[i].removeAttribute('data-low-res-src');	
            }
                
            var index = Math.floor(Math.random() * 121) + 0; // currently 122 photos available
            //images[i].src = theGirlsPhotos[photoIndex];
            images[i].src = chrome.extension.getURL('/images/golden' + index + '.jpg');
        }
    }
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








