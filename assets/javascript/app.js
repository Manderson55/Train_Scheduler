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
    var frequency = 0;
    var nextArrival = " ";
    var minutesAway = 0;
    var hoursAway = 0;
    var firstTrainTime = "00:00" //military time
    var inputError = false;
    var timeOfDay = "";
    // Functions
    //this is not working!!!!!!!
    function checkForInput(trainName, destination,firstTrainTime, frequency) {
        if (trainName === null){
            alert("You need to enter name for the train");
            inputError = true;
        } else 
        if (destination === null){
            alert("You need to enter a destination for the train");
            inputError = true;
        } else
        if (firstTrainTime === "00:00") {
            alert("You need to enter a valid time for the first train");
            inputError = true;
        } else
        if (frequency === 0){
            alert("You need to enter a frequency for the train");
            inputError = true;
        }
 
    } //end checkforinput

    $("#addTrain").on("click", function(event) {

    //    checkForInput();
    //    console.log("Input Error = " + inputError);
        //check to see if user entered all input fields
    //    if (!inputError) {
 
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
          $("#firstTrainTime").val("00:00");
          $("#frequency").val("0");

    //   } // end if user entered all data
    //     else {
     //         console.log("Input Error = " + inputError);
     //         alert ("Make sure you enter all the fields in the correct format!")
     //     } //end else
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
    //if more than 59 min display in hours and min
  
    var diffInTimes = moment().diff(moment(firstTrainTimeConverted), "minutes");
    console.log ("difference between current time and time when first train started = " +
                  diffInTimes);

    var timeApart = diffInTimes % frequency;
    console.log ("frequency " + frequency);
    console.log ("time apart " + timeApart);

    minutesAway = frequency - timeApart;
    console.log ("minutes away " + minutesAway);
    if (minutesAway > 59){
       hoursAway = Math.round(minutesAway / 60);
       console.log(hoursAway);
       hoursMinutesAway = minutesAway % 60;
       console.log(hoursMinutesAway);
       minutesAway = hoursAway + " hours " + hoursMinutesAway + " minutes";
       console.log ("minutes away " + minutesAway);
    }
 
    var nextArrivalTime = moment().add(minutesAway, "minutes");
    nextArrival = moment(nextArrivalTime).format("hh:mm");
    console.log("NEXT ARRIVAL TIME: " + moment(nextArrivalTime).format("hh:mm"));

    /* not working
    if (nextArrival >= "12:00"){
        timeOfDay = "PM"
    } else {
        timeOfDay = "AM"
      }

    console.log(timeOfDay);
    */
 

    // display data in the window 
    $("#trainSchedule > tbody").append("<tr><td>" + trainName +
                                       "</td><td>" + destination +
                                       "</td><td>" + frequency + 
                                       "</td><td>" + nextArrival + " " + timeOfDay +
                                       "</td><td>" + minutesAway + 
                                       "</td></tr>");
}); // end snapshot




















}); //end document on load