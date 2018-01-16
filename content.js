
toggleNames(enabled);
toggleImages(enabled);

function toggleNames(enabled) {
    
    const namesUrl = "https://golden-times.firebaseio.com/.json";

    let namePairs = [];
    let elements = document.getElementsByTagName('*');
    
    var storyHeadings = $(".story-heading");
    

    

    
    $.getJSON(namesUrl, function(data) {
        $.each(data, function(i,item){
            let namePair = [item.before, item.after];
            namePairs.push(namePair);
        });
    
        // console.log("namePairs.length: " + namePairs.length);

        for (let i=0; i < namePairs.length; i++) {
            
            // console.log("origName: " + namePairs[i][0] + " \nafterName: " + namePairs[i][1]);
            
            if (enabled) {
                beforeName = namePairs[i][0];
                afterName = namePairs[i][1];
            } else {
                beforeName = namePairs[i][1];
                afterName = namePairs[i][0];
            }
            

            
            for (let i = 0; i < storyHeadings.length; i++) {
        
                var storyHeading = storyHeadings[i];
        
                for (var j = 0; j < storyHeading.childNodes.length; j++) {
                    var node = storyHeading.childNodes[j];
		
		    // if the node type is text of an attribute or element, and it has a value
                    if (node.nodeType === 3 && node.nodeValue) {
                        
                        var text = node.nodeValue;
                        var regExInput = new RegExp(beforeName, "gi");
                        node.nodeValue = text.replace(regExInput, afterName); 
                    }
                }
            }
            
            
            
            
            for (var j = 0; j < elements.length; j++) {
                
                var element = elements[j];

                for (var k = 0; k < element.childNodes.length; k++) {
                    var node = element.childNodes[k];

                    if (node.nodeType === 3 && node.nodeValue) {

                        var text = node.nodeValue;
                        var regExInput = new RegExp(beforeName, "gi");
                        node.nodeValue = text.replace(regExInput, afterName); 
        
//                        if (enabled) {
//                            if (text == text.toUpperCase()) {
//                                replacedText.toUpperCase();
//                            } 
//                        }    
                    }
                }
            }
        }
        


    });
}



// function replaceNames(node, element, before, after, enabled) {
function replaceNames(node, origName, newName, enabled) {

    for (var i = 0; i < names.length; i++) {        

        if (enabled) {
            beforeName = names[i][0];
            afterName = names[i][1];
        } else {
            beforeName = names[i][1];
            afterName = names[i][0];
        }

        var text = node.nodeValue;
    
        var regExInput = new RegExp(beforeName, "gi");
        var replacedText = text.replace(regExInput, afterName); 
        
        if (enabled) {
            if (text == text.toUpperCase()) {
                replacedText.toUpperCase();
            } 
        }
    
        node.nodeValue = replacedText;
    }
}



function toggleImages(enabled) {
    
    var images = document.querySelectorAll("img", "figure", "gwd-taparea", "iframe");        
        
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
                
            if (images[i].hasAttribute('data-threshold')){
				images[i].removeAttribute('data-threshold');	
            }
            
            // remove srcset attributes
            if (images[i].hasAttribute('srcset')) {
                images[i].removeAttribute('srcset');	
            }


            if (!images[i].hasAttribute('orig-src')) {
                $(images[i]).attr('orig-src',images[i].src);                
            }

            if (!images[i].hasAttribute('new-src')) {
                var index = Math.floor(Math.random() * 121) + 0; // currently 122 photos available
                $(images[i]).attr('new-src', chrome.extension.getURL('/images/golden' + index + '.jpg'));
            }

            if (enabled) {                     
                images[i].src = $(images[i]).attr("new-src");
            } else {
                images[i].src = $(images[i]).attr("orig-src");
            }
            
        }
    }
}










