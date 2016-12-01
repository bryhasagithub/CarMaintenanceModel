

var cars = [ "Tires"  ,"Brake Pads", "Struts","Brake Rotors", "Battery" , "Fuel Pump" , "Fuel Filter" ,
            "Differential Fluid" , "Differential" ,"DriveShaft" , "Clutch" , "Transmission" ,
            "Serpentine Belt" ,"Water Pump" ,"Timing Belt" ,"Ignition Wires","Sparkplugs" ,"Air Filter"  ,
             "Ignition Wire Cover" ,  "Distributer Cap" ,"Air Intake",  "Oil" ,"Oil Filter" ,"Alternator" ,  
             "Radiator" ,"Coolant" , "Engine Mount" , "Engine"];

var mileage = ["25,000 - 50,000 miles", "30,000 - 50,000 miles", "50,000 - 100,000 miles","50,000 - 70,000 miles", "4 - 5 years",
            "100,000 - 150,000 miles", "25,000 - 30,000 miles", "30,000 - 50,000 miles", "N/A", "N/A", "50,000 - 150,000 miles",
            "N/A", "40,000 - 60,000 miles", "60,000 - 100,000 miles", "60,000 - 100,000 miles", "50,000 - 60,000 miles", 
            "20,000 - 60,000 miles", "12,000 - 15,000 miles", "N/A", "N/A", "N/A", "5000 - 10,000 miles", "5000 - 10,000 miles", 
            "40,000 - 100,000 miles", "N/A", "40,000 - 60,000 miles", "3- 4.5 years", "N/A" ];
var selectedToggle = false;
var currentSelectedIMG = "emptyImg";
var nextSelectedIMG = "emptyImg";
var currentPart = "emptyPart";
var numItem = 0;
var togglePic = false;
var descToggle = false;

//on page load function
$(document).ready(function() {
    $(".boxDesc").animate({opacity: 0});
    $("#popUpBox").hide();
	$("#headerBar").hide().slideDown(600);
	$("#headLogo").hide().fadeIn(1100); 
    $("#storyLine").hide().fadeIn(1100); 
    $("#carTitle").hide().fadeIn(1100); 
    $("#car").hide();

    $(document).scroll(function() {
    var y = $(this).scrollTop();
    
    if (y > 550  && togglePic== false) {
        loadPartList();
        loadCarList();
        $("#listBox").hide().slideDown(500);
        $("#partsContainer").hide().delay(500).fadeIn(500);
        $("#car").hide().delay(2600).fadeIn(500);
        for (var i = cars.length; i >=0; i--) 
        $('#item' + (cars.length-i)).hide().delay(800).slideDown((i*60+200 ));
        togglePic =true;
        $("INPUT").click(function() {
            var selectedId = this.id;
            currentPart =  $('#' + selectedId).val();
            if(selectedId.length == 13)
                numItem = selectedId.slice(-2);
            else
                numItem = selectedId.slice(-1);
            
            currentSelectedIMG = ('item' + numItem);
            if(selectedToggle == false){
                for (var j = 0; j <cars.length; j++)
                    if(selectedId != ('partsButton'+j)){
                        $('#item' + (j)).slideUp((j*60));
                        getInfo();
                        $('#popUpBox').hide().delay(1000).fadeIn(500);
                    }
                selectedToggle= selectedToggle != true;
            }
            else{
                $(('#' + nextSelectedIMG)).slideUp(500);
                $(('#' + currentSelectedIMG)).slideDown(500);
                getInfo();
            }
            nextSelectedIMG = currentSelectedIMG;
        });
    }
 });
//when button is selected, slides up all other components that aren't what is selected.
//click on headtitle to reset car Model
    $("#headTitle").click(function() {
        selectedToggle= false;
        $(('#' + nextSelectedIMG)).slideUp(500);
        for (var i = cars.length; i >=0; i--) 
           $('#item' + (cars.length-i)).slideDown((i*60));
        $("#popUpBox").hide();
        resetInfo();
    });

//toggles inbetweeen the img and descprtion for boxes below.
    $(".imgBox").click( function(event){
        event.preventDefault();
        var selectedBoxId = this.id;
        var descNum =  selectedBoxId.slice(-1);
        if ( $(this).hasClass("isShown") ) {
            $("#" + selectedBoxId).stop().animate({opacity: 0});  
            $("#" + descNum).stop().animate({opacity: 1});                        
        } else {
            $("#" + selectedBoxId).stop().animate({opacity: 1});  
            $("#" + descNum).stop().animate({opacity: 0}); 
        }
        $(this).toggleClass("isShown");
        return false;
    });

});


//Loads the car pictures into the box using cars array
function loadCarList(){
    var getCarBox = document.getElementById("carModelBox");   
    for(var j =cars.length-1;j>=0; j--){
        var p = document.createElement('img');
        p.setAttribute('class', 'parts');
        p.setAttribute('id', ('item'+ j));
        p.setAttribute('src', 'js/CarModel/'+cars[j]+'.png');
        getCarBox.appendChild(p); 
    }
    for(var a = 0; a<6; a++)
        document.getElementById(("item"+a)).style.zIndex = (-(7-a));
    
     document.getElementById(("item"+17)).style.opacity = (.6);
     document.getElementById(("item"+19)).style.opacity = (.6);
}

//loads the car parts into buttons container usin carse array
function loadPartList(){
    var getPartsHead = document.getElementById("partsContainer");   
    for(var i =0;i<cars.length; i++){
        var b = document.createElement('INPUT');
        b.setAttribute('id', ('partsButton'+ i));
        b.setAttribute("type", "button");
        b.setAttribute("class", "btn");
        b.setAttribute('value', cars[i]);
        getPartsHead.appendChild(b); 
    }
}
//obtains name and mile information for chosen part
function getInfo(){
    var getName= document.getElementById('name');
    var getMiles= document.getElementById('miles');
    getName.innerHTML = currentPart;
    getMiles.innerHTML = mileage[numItem];
}
function resetInfo(){
    var getName= document.getElementById('name');
    var getMiles= document.getElementById('miles');
    getName.innerHTML = "";
    getMiles.innerHTML = "";
}

