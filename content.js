var responseAction;

chrome.runtime.sendMessage({checkForEnabled: "Performing a check"}, function(response) {
    responseAction = response.action;
    
    if (responseAction == true) {
        toggleNames();
    } else {
        toggleNames();
    }
    
});


function toggleNames() {

    var elements = document.getElementsByTagName('*');

    var names = [["Donald Trump","Dorothy Zbornak"],
                 ["Trump","Zbornak"],
                ["Mr. Trump","Ms. Zbornak"],
                ["Melania Trump","Stanley Zbornak"],
                ["Ms. Trump","Mr.Zbornak"],
                ["Mrs. Trump","Mr. Zbornak"],
                ["Mike Pence","Sophia Petrillo"],
                ["Mr. Pence","Mrs. Petrillo"],
                ["Pence","Petrillo"],
                ["Betsy Devos","Rose Nylund"],
                ["Devos","Nylund"],
                ["Ben Carson","Miles Webber"],
                ["Carson","Webber"],
                ["Jeff Sessions","Blanche Devereaux"],
                ["Mr. Sessions","Mrs. Devereaux"],
                ["Sessions","Devereaux"],
                ["Nikki Haley","Virginia Hollingsworth"],
                ["Haley","Hollingsworth"],
                ["Steve Bannon","Mario Lopez"],
                ["Bannon","Lopez"],
                ["Jared Kushner","Michael Zbornak"],
                ["Mr. Kushner","Little Zbornak"],
                ["Kushner","Little Zbornak"],
                ["Ivanka Trump","Barbara Thorndyke"],
                ["Ivanka","Barbara"],
                ["Scaramucci","Peterson"],
                ["Anthony Scaramucci","Arnie Peterson"],
                ["John Kelly","Truby Steele"],
                ["Mr. Kelly","Ms. Steele"],
                ["Kelly","Steele"],
                ["Sarah Huckabee Sanders","Bessie the Showbiz Chicken"],
                ["Sarah Sanders","Bessie the Showbiz Chicken"],
                ["Mrs. Sanders","Miss Bessie"],
                ["Ms. Sanders","Miss Bessie"],
                ["Sanders","Bessie"],
                ["Kellyanne Conway","Enrique Mas"],
                ["Ms. Conway","Mr. Mas"],
                ["Conway","Mas"],
                ["Vladimir Putin","Coco the Gay Cook (who only lasted one episode)"],
                ["Putin","Coco"],
                ["Mr. Putin","Mr. Coco"],
                ["Kim Jong-un","Johnny No-Thumbs"],
                ["Kim Jong un","Johnny No-Thumbs"],
                ["Jong-un","No-Thumbs"],
                ["Washington","St. Olaf"],
                ["Pentagon","Rusty Anchor"],
                ["Stephen Miller","Raoul (Sophia's date to the banquet)"],
                ["Miller","Raoul"],
                ["Mr. Miller","Raoul"],
                ["Robert Mueller","Al Mullens"],
                ["Robert S. Mueller","Al Mullens"],
                ["Mueller","Mullens"],
                ["James Comey","Bobby Hopkins"],
                ["Comey","Hopkins"],
                ["Neil Gorsuch","Little Sven from Sweden"],
                ["Mr. Gorsuch","Little Sven"],
                ["Gorsuch","Sven"],
                ["Paul Ryan","Bobby Hopkins (played by a young George Clooney)"],
                ["Ryan","Hopkins"],
                ["Washington","St. Olaf"],
                ["White House","Rusty Anchor"]

            ];
    


    for (var i = 0; i < names.length; i++) {

        if (responseAction == true) {
            beforeName = names[i][0];
            afterName = names[i][1];
        } else {
            beforeName = names[i][1];
            afterName = names[i][0];
        }
        
        
        for (var j = 0; j < elements.length; j++) {
            var element = elements[j];


            for (var k = 0; k < element.childNodes.length; k++) {
                var node = element.childNodes[k];

                replaceNames(node, element, beforeName, afterName);

            }
        }
    }
}



function replaceNames(node, element, before, after) {

    
    if (node.nodeType === 3) {
        var text = node.nodeValue;
        var regExInput = new RegExp(before, "g");
        var replacedText = text.replace(regExInput, after);           


        
        if (replacedText !== text) {
            element.replaceChild(document.createTextNode(replacedText), node);
        } else {

        }
    }
}








