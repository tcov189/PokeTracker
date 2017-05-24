//// ==== Tab Group JS v1.1.0 ==== ////
//// Hide and show content based on which tab is clicked
//// Authored by Trevor Covington tcovington189@gmail.com
//// https://github.com/tcov189/tab-groups

// Add event listener
/*$(".tab-group ul.tab-group-nav .nav-tab").on('click', function(){changeTabs();});*/

var $navTabs = document.querySelectorAll(".nav-tab");
for (var i = 0, max = $navTabs.length; i < max; i++){
    $navTabs[i].addEventListener('click', changeTabs);
}

// Main function for changing tabs. 
// dataTab parameter allows you to specifiy a specfic tab that you want to be made active
// clickToClose lets you decide if you want the user to be able to click the active tab to hide the content
function changeTabs(dataTab, clickToHide){
    
    // Set empty var for dataTabValue
    var dataTabValue;    
    // Set clickToHide to be false by default
    clickToHide = clickToHide ? true : false;
    
    // Checks to see if dataTab is passed in and make sure its a string (because if you add function to an eventListner it will pass in the event as an argument)
    if (dataTab && typeof dataTab === 'string') {
        // Set dataTabValue to be the argument
        dataTabValue = dataTab;
    } else {
        // Set dataTabValue to be the data-tab value of the clicked element
        dataTabValue = dataTab.currentTarget.dataset.tab;   
    }        
    
    // Vars for targeting the tabGroupContent elements
    var $tabGroupContent    = document.querySelectorAll(".tab-group-content");    
    
    //Loop through tabs
    $navTabs.forEach(function(currentTab, index){        
        // If currentTab doesn't have active class
        if(currentTab.className.indexOf('active') === -1) { 
            // if dataTabValue matches the data-tab value of the currentTab in the loop
            if (dataTabValue === currentTab.dataset.tab) {
                // Append active to the className
                currentTab.className += ' active';                
            }
        } else {
            // if dataTabValue doesn't equal the currentTab data-tab value
            if (dataTabValue !== currentTab.dataset.tab || clickToHide) {                
                // Remove active from className
                currentTab.className = currentTab.className.replace(' active', '');             
            }
        }
    });
    
    //Loop through tabGroupContents
    $tabGroupContent.forEach(function(tabGroupContent, index){
        // If tabGroupContent element doesn't have active class
        if (tabGroupContent.className.indexOf('active') === -1) {
            // if dataTabValue matches the data-content value of the tabGroupContent in the loop
            if (tabGroupContent.dataset.content === dataTabValue) {         
                // Append active to the className
                tabGroupContent.className += ' active';               
            }                
        } else {
            if (dataTabValue !== tabGroupContent.dataset.content || clickToHide) {    
                // Remove active from classNAme
                tabGroupContent.className = tabGroupContent.className.replace(' active', '');                          
            }
        }
    });            
}