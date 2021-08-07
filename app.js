"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#r[g]on 

// app is thefunction called to start the entire application
function app(people) {
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
   let searchResults;
   let startFindAttributes;
  switch (searchType) {
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      ///do we ask if they want to search by one single trait here?
      startFindAttributes = traits(people);
      break;
    default:
      app(people);  // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}




function traits(attribute) {
  let input = prompt ("Please write up to 5 traits you would like to input to find your person. Options include: eye color, occupation, gender, DOB, Weight, Height, ID. ")
  input.trim();
  input.toLowerCase();
    //above changes the string input to all lower case. below changes the input to a string
  let arrInput = input.split(" ")
    let eyeResults = [];
    let occupationResults = [];
    let genderResults = [];
    let dobResults = [];
    let weightResults = [];
    let heightResults = [];
    let idResults = [];
for (let i=0; i<=arrInput.length-1; i++){
  if (arrInput[i]=="eye"|| arrInput[i] == "eye color"){
    let findEyeColor = searchByEyeColor (attribute);
    eyeResults.push(findEyeColor);

  }
  if (arrInput[i] == "occupation"||arrInput[i]  == "occupation,"){
    let findOccupation = searchByOccupation (attribute);
     occupationResults.push(findOccupation);

  }
  if (arrInput[i] == "gender"|| arrInput[i]  == "gender,"){
    let findGender = searchByGender (attribute);
    genderResults.push(findGender); 
  }
  if (arrInput[i] == "dob"|| arrInput[i]  == "dob,"){
    let findDob = searchByDOB(attribute);
    dobResults.push(findDob);
  }
  if (arrInput[i]  == "weight"|| arrInput[i]  == "weight,"){
    let findWeight = searchByWeight(attribute);
  weightResults.push(findWeight);
  }
  if (arrInput[i] == "height"|| arrInput[i]  == "height,"){
  let findHeight = searchByHeight (attribute);
  heightResults.push(findHeight);
  }
  if (arrInput[i] == "id"|| arrInput[i]  == "id,"){
  let findId = searchById (attribute);
  idResults.push(findId);
  }

  // final function needs to be the one comparing the results 
  //we will return a prompt that will display the info of the person from the final function 
  }
  filterTraits(eyeResults, occupationResults, genderResults, dobResults, weightResults, heightResults, idResults);
}




function filterTraits (t1,t2,t3,t4,t5,t6,t7){
  let filter1 = people.filter(t1)
    if (t1 == null){
      filter1 = people;
    }
  let filter2 = people.filter(t2)
    if(t2 == null){
      filter2 = filter1;
    }
  let filter3 = people.filter(t3)
    if (t3 == null){
      filter3 = filter2;
    }
  let filter4 = people.filter(t4)
    if (t4 == null){
      filter4 = filter3;
    }
  let filter5 = people.filter(t5)
    if (t5 == null){
      filter5 = filter4;
    }
  let filter6 = people.filter(t6)
    if (t6 == null){
      filter6 = filter5;
    }
  let filter7 = people.filter(t7)
    if (t7 == null){
      filter7 = filter6;
    }
  displayPerson (filter7);
  }


// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  //We need people in order to find descendants and other information that the user may want. */
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  switch (displayOption) {
    case "info":
      alert (person.map(function(people){
       let personInfo= "First Name: " + people.firstName + "\n";
       personInfo += "Last Name: " + people.lastName + "\n";
       personInfo += "Eye Color:" + person.eyeColor + "\n";
       personInfo += "Occupation:" + person.occupation +"\n";
       personInfo += "Gender:" + person.gender + "\n";
       personInfo += "Height:" + person.height + "\n";
       personInfo += "Weight:" + person.weight + "\n";
    alert(personInfo);   
  }).join("\n"));
  }
  //     break;
  //   case "family":
  //     // TODO: get person's family
  //     break;
  //   case "descendants":
  //     let displayOption = promptFor ("Found" + person.firstName + " " + person.lastName + "Would you like to see their descendants information?")
      
  //     break;
  //   case "restart":
  //     app(people); // restart
  //     break;
  //   case "quit":
  //     return; // stop execution
  //   default:
  //     return mainMenu(person, people); // ask again
  // }       
}

//#endregion

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
 //need to capitalize first letter bc its important to the matching process
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    
    } else {
      return false;
    }
  })
  return foundPerson[0];
}



//unfinished function to search through an array of people to find matching eye colors. Use searchByName as reference.
function searchByEyeColor(people) {
  let eyeColor = promptFor("What is the persons's eye color?", autoValid);

  let foundEyeColor = people.filter(function (potentialMatch) {
    if (potentialMatch.eyeColor === eyeColor) {
      return true;
    } else {
      return false;
    }
  })
  return foundEyeColor;
}

//TODO: add other trait filter functions here.
function searchByOccupation(people) {
  let occupation = promptFor("What is the persons's Occuapation?", autoValid);

  let foundOccupation = people.filter(function (potentialMatch) {
    if (potentialMatch.occupation === occupation) {
      return true;
    } else {
      return false;
    }
  })
  return foundOccupation;
}

function searchByGender(people) {
  let gender = promptFor("What is the persons's gender?", autoValid);

  let foundGender = people.filter(function (potentialMatch) {
    if (potentialMatch.gender === gender) {
      return true;
    } else {
      return false;
    }
  })
  return foundGender;
}

function searchByDOB(people) {
  let dob = promptFor("What is the persons's date of birth?", autoValid);

  let foundDob = people.filter(function (potentialMatch) {
    if (potentialMatch.dob === dob) {
      return true;
    } else {
      return false;
    }
  })
  return foundDob;
}


function searchByHeight(people) {
  let height = promptFor("What is the persons's height?", autoValid);

  let foundHeight = people.filter(function (potentialMatch) {
    if (potentialMatch.height === height) {
      return true;
    } else {
      return false;
    }
  })
  return foundHeight;
}

function searchByWeight(people) {
  let weight = promptFor("What is the persons's Weight?", autoValid);

  let foundWeight = people.filter(function (potentialMatch) {
    if (potentialMatch.weight === weight) {
      return true;
    } else {
      return false;
    }
  })
  return foundWeight;
}

function searchById(people) {
  let id = promptFor("What is the persons's Id?", autoValid);

  let foundId = people.filter(function (potentialMatch) {
    if (potentialMatch.id === id) {
      return true;
    } else {
      return false;
    }
  })
  return foundId;
}

function searchBySpouse(people) {
  let currentSpouse = promptFor("Who is the persons's current spouse?", autoValid);

  let foundCurrentSpouse = people.filter(function (potentialMatch) {
    if (potentialMatch.currentSpouse === currentSpouse) {
      return true;
    } else {
      return false;
    }
  })
  return foundCurrentSpouse;
}

function searchByParents(people) {
  let parents = promptFor("Who is the persons's parents?", autoValid);

  let foundParents = people.filter(function (potentialMatch) {
    if (potentialMatch.parents === parents) {
      return true;
    } else {
      return false;
    }
  })
  return foundParents;
}







//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(people) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  alert(people.map(function (person) {
  let personInfo = "First Name: " + people.firstName + "\n";
  personInfo += "Last Name: " + people.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
    
}).join("\n"));
}
//#endregion
//////////////running into problems with display person and the splitting of the //////
//////////////arrays that have been filtered for each trait. /////////////////////////


//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region 

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let response;
  let isValid;
  do {
    response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false)
  return response;
}

// helper fuction/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() ==  "yes" || input.toLowerCase() == "no") {
    return true;
  } 
  else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {

}

//#endregion