console.log("hello world")

let goalWeightInput = document.getElementById('goalWeight')
let submitButton = document.getElementById('submitWeight')
let userWeight = document.getElementById('userWeight')
 submitWeight.addEventListener('click', () => {
   const goalWeightNumber = Number(goalWeightInput.value)
   console.log(goalWeightNumber+" goal")
   const usercurrentWeight =  Number(userWeight.innerHTML.split(' ')[1])
   console.log(usercurrentWeight+ 'current')
   const numberOfCaloriesToBurn = (usercurrentWeight - goalWeightNumber) * 3500
   console.log(numberOfCaloriesToBurn+" call to burn")
  const numberOfDaysToGetToGoalWeight = numberOfCaloriesToBurn / 1000
  console.log(numberOfDaysToGetToGoalWeight+ 'days to get there')
  // console.log(typeof Number(goalWeightInput.value))
  // console.log(typeof Number(userWeight.innerHTML.split(' ')[1]))
   fetch('/goalWeight', {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json',
    },
     body: JSON.stringify({
       'goalWeight': goalWeightInput.value,
       'numberOfDaysToGetToGoalWeight': numberOfDaysToGetToGoalWeight
     })

   })
   .then(response => response.json())
   .then(data => {
    console.log(data);
    // document.getElementById('Weight').innerHTML = data.value.local.goalWeight
    const goalWeight = data.value.local.goalWeight
    const currentWeight = data.value.local.weight
    // const numberOfCaloriesToBurn = (currentWeight - goalWeight) * 3500
    // const numberOfDaysToGetToGoalWeight = numberOfCaloriesToBurn / 1000
    // document.getElementById('daystoloose').innerHTML = `if you consume 1000 calories a day it will take you ${numberOfDaysToGetToGoalWeight} days to get to your goal weight.`
})
    setTimeout(function(){ location.reload(); }, 100)

 })
