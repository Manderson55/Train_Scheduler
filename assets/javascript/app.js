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

    var trainName = " ";
    var destination = " ";
    var frequency = "";
    var nextArrival = " ";
    var minutesAway = 0;
    var hoursAway = 0;
    var firstTrainTime = "" //military time
    var inputError = false; //if there was a problem with the input
    var timeOfDay = "";


    $("#addTrain").on("click", function(event) {

    //check to see if user entered all input fields
    //and they are correct
 
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

          alert("Train Route Added");

          // Clear all of the input boxes after train is added
          $("#trainName").val("");
          $("#destination").val("");
          $("#firstTrainTime").val("");
          $("#frequency").val("");

  
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

    //need to convert the time to 1 year in the past since we can't make calculations
    //in the future and we are not displaying the year
    var firstTrainTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log( "converted first train time " + firstTrainTimeConverted);
    console.log("converted first train time: " + firstTrainTimeConverted.format("hh:mm"));
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime));
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    // Calculate the next arrival time
  
    var diffInTimes = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log ("difference between current time and time when first train started = " +
                  diffInTimes);

    var timeApart = diffInTimes % frequency;
    console.log ("frequency " + frequency);
    console.log ("time apart " + timeApart);

    minutesAway = frequency - timeApart;
    console.log ("minutes away " + minutesAway);

 
    var nextArrivalTime = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrivalTime).format("hh:mm A");
    console.log("NEXT ARRIVAL TIME: " + moment(nextArrivalTime).format("hh:mm A"));


    if (minutesAway > 59){
       hoursAway = Math.round(minutesAway / 60);
       console.log(hoursAway);
       hoursMinutesAway = minutesAway % 60;
       console.log(hoursMinutesAway);
       minutesAway = hoursAway + " hours " + hoursMinutesAway + " minutes";
       console.log ("minutes away " + minutesAway);
    } else {
       minutesAway = minutesAway + " minutes";
    }

    // display data in the window 
    $("#trainSchedule > tbody").append("<tr><td>" + trainName +
                                       "</td><td>" + destination +
                                       "</td><td>" + frequency + 
                                       "</td><td>" + nextArrival + " " + timeOfDay +
                                       "</td><td>" + minutesAway + 
                                       "</td></tr>");
}); // end snapshot




















}); //end document on load