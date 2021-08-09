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



function traits(people) {
  let input = prompt ("Please write up to 5 traits you would like to input to find your person. Options include: eye color, occupation, gender, DOB, Weight, Height, ID. ")
  input.trim();
  input.toLowerCase();
  let arrInput = input.split(" ")
  let compareArr = people
  let searchArr = []

for (let i=0; i<=arrInput.length-1; i++){
  if (arrInput[i]=="eye"|| arrInput[i] == "eye color"){
    searchArr = compareArr
    let findEyeColor = searchByEyeColor (searchArr);
    searchArr = compareArr
    }
  }
  if (arrInput[i]=="weight" || arrInput[i]=="weight,"){
    let findWeight = searchByWeight(searchArr);
    compareArr = findWeight;
    if (compareArr.length == 0) {
        alert("No results found")
        return;
    }
   
  }
  else if (arrInput[i]=="occupation" || arrInput[i]=="occupation,") {
    let findOccupation= searchByOccupation(searchArr);
    compareArr = findOccupation;
    if (compareArr.length == 0) {
        alert("No results found")
        return;
    }
    
  }
  else if (arrInput[i]=="gender" || arrInput[i]=="gender,") {
  let findGender = searchByGender(searchArr);
    compareArr = findGender;
    if (compareArr.length == 0) {
        alert("No results found")
    }
  }
  else if (arrInput[i]=="dob" || arrInput[i]=="dob," || arrInput[i]=="date of birth" || arrInput[i]=="date of birth,") {
  let findDob = searchByDOB(searchArr);
    compareArr = findDob;
    if (compareArr.length == 0) {
        alert("No results found")
    }
  }
  else if (arrInput[i] == "height"|| arrInput[i]  == "height,"){
    searchArr = compareArr
    let findHeight = searchByHeight (searchArr);
    compareArr = findHeight;
    if (compareArr.length == 0) {
          alert("No results found")
    }
  }
  else if (arrInput[i] == "id"|| arrInput[i]  == "id,"){
    searchArr = compareArr
    let findId = searchById (searchArr);
    compareArr = findId;
    if (compareArr.length == 0) {
      alert("No results found")
    }
   }
   displayPerson (compareArr);
  }

// ********This was an attempt at the Multi Filter that I wasn't willing to delete yet.********************************
//   compareArr = [eyeResults, occupationResults, genderResults, dobResults, weightResults, heightResults]
//   let eyeResults = arrOfArrays[0];
//   let occupationResults = arrOfArrays[1];
//   let genderResults = arrOfArrays[2];
//   let dobResults = arrOfArrays[3];
//   let weightResults = arrOfArrays[4];
//   let heightResults = arrOfArrays[5];
  

//   let comparedArr = [];
//   let comparedArrAlt = []
 
//   for (let i = 0; i<eyeResults.length; i++){
//     for (let j = 0; j<occupationResults.length; j++){
//       if (eyeResults[i] === occupationResults[j]) {
//         comparedArr.push(eyeResults[i])
//       }
//     }
//   }
//   for (let i = 0; i<comparedArr.length; i++){
//     for (let j = 0; j<genderResults.length; j++){
//       if (comparedArr[i] === genderResults[j]) {
//         comparedArrAlt.push(comparedArr[i])
//       }
//     }
//   }
//   comparedArr = []
//   for (let i = 0; i<comparedArrAlt.length; i++){
//     for (let j = 0; j<genderResults.length; j++){
//       if (comparedArrAlt[i] === genderResults[j]) {
//         comparedArr.push(comparedArrAlt[i])
//       }
//     }
//   }
  

//   let arr3 = [];
//   for (let i=0; i<arr1.length-1; i++){
//     for (let j=0; j<arr2.length-1; j++){
//       if (arr1[i] === arr2[j]) {
//         arr3.push(arr1[i]);
//       }
//     }
//   }
//   alert ("The person " arr3);
// }


// Menu function to call once you find who you are looking for
function mainMenu(person, people) {
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. 
  //We need people in order to find descendants and other information that the user may want. */
  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);
  switch (displayOption) {
    case "info":
      let displayInfo =  "Name:" + person[0].firstName+ " "+ person[0].lastName+ "\n";
      displayInfo += "ID: " + person[0].id +"\n";
      displayInfo += "DOB:" + person[0].dob + "\n";
      displayInfo += " Gender: "+ person[0].gender + "\n";
      displayInfo += " Height: "+ person[0].height + "\n";
      displayInfo += " Weight: "+ person[0].weight + "\n";
      displayInfo += " Eye Color: "+ person[0].eyeColor +"\n";
      displayInfo +=  " Occupation: " + person[0].occupation + "\n";
      displayInfo += "\n";
      displayInfo += "click 'ok' to see family information.";
      alert (displayInfo);
      
    case "family":
      let displayFamily =  "The family of " + person[0].firstName+ " "+ person[0].lastName+  " is: " + "\n";
      displayFamily += "Parents ID:" + person[0].parents + "\n";
      displayFamily += " Current Spouse ID: "+ person[0].currentSpouse + "\n";
      alert (displayFamily);
    case "descendants":
     let displayDescendants = promptFor ("Found " + person[0].firstName + " " + person[0].lastName + "Would you like to see their descendants information?", yesNo);
        switch(displayDescendants){
          case "yes":
            let descendants = findDescendants(people, person[0].id);
            alert (descendants);
            break;
          case "no":
            app(people);
            break;
        }
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }       
}

//#endregion


function findDescendants(people, person) {
  let foundDescendants = [];
  for (let i = 0; i < people.length; i++) {
    if (people[i].parents.includes(person)) {
      foundDescendants.push(people[i].firstName + " " + people[i].lastName + " " + people[i].id);
    }
  }
  for (let i = 0; i < foundDescendants.length; i++) {
    foundDescendants = foundDescendants.concat(
      findDescendants (people, foundDescendants[i])
    );
  }
   return foundDescendants;
}

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
     else {
      return false;
    }
  })
  return foundPerson;
}


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









//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region 

// alerts a list of people
function displayPeople(people) {
  alert(people.map(function (person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(people) {
  let personInfo = "First Name: " + people.firstName + "\n";
  personInfo += "Last Name: " + people.lastName + "\n";

  alert(personInfo);
}
//#endregion


//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
    var isValid = valid(response);
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

