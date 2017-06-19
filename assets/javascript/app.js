 $(document).ready(function(){
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA8A8AAEgZNrmHbhw0iu2E8YnXpx45vqAg",
      authDomain: "train-scheduler-4a63c.firebaseapp.com",
      databaseURL: "https://train-scheduler-4a63c.firebaseio.com",
      projectId: "train-scheduler-4a63c",
      storageBucket: "",
      messagingSenderId: "524207326642"
    };
    firebase.initializeApp(config);

    var trainDatabase = firebase.database();

    var trainName = "";
    var destination = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    $("#addTrain").on("click", function(event) {
 
        event.preventDefault(); 
        console.log('inside the onclick'); 
        trainName = $("#trainName").val().trim();
        console.log (trainName);
        destination = $("#destination").val().trim();
        console.log (destination);
        firstTrainTime = $("#firstTrainTime").val();
        console.log (firstTrainTime);
        frequency = $("#frequency").val();
        console.log (frequency);       

        //upload the new train to the database
        trainDatabase.ref().push({
          trainName: trainName,
          destination: destination,
          firstTrainTime: firstTrainTime,
          frequency: frequency
        });
  }); //end add train on click

  trainDatabase.ref().on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;

    // Train Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
    empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
});




















}); //end document on load