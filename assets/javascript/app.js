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
    var frequency = 0;
    var nextArrival = "";
    var minutesAway = 0;

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
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTime;
    var frequency = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    // convert to unix for calculations
    //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

    // Calculate the next arrival time
    //var empMonths = moment().diff(more than 59 min display in hours

    // Calculate how many minutes away the next train is
    //if it is more than 59 min display in hours
    //var empBilled = empMonths * empRate;
    //console.log(empBilled);

    // display data in the window 
    $("#trainSchedule > tbody").append("<tr><td>" + trainName +
                                       "</td><td>" + destination +
                                       "</td><td>" + frequency + 
                                       "</td><td>" + nextArrival + 
                                       "</td><td>" + minutesAway + 
                                       "</td></tr>");
});




















}); //end document on load