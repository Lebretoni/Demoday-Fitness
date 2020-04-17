let sum = () => {
  let sumOfCallories= 0
  let caloriesSum = document.getElementsByClassName('calories')
  let menuOfFoodEaten = Array.from(caloriesSum)
  for(let i=0; i<menuOfFoodEaten.length;i++){
    // sumOfCallories+=
    sumOfCallories += Number(menuOfFoodEaten[i].innerHTML)
  }
  console.log(sumOfCallories)
  document.getElementById('calorieCount').innerHTML = "Calorie Count: "+sumOfCallories
  if(sumOfCallories >= 1000){
    document.getElementById('calorieCountHit').innerHTML = 'You have hit 1,000 Calories!'
  }
}
console.log(sum())



let trash = document.getElementsByClassName('deleteMeal')
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log('click')
        console.log(this.parentNode.childNodes)
        let _id = this.parentNode.childNodes[9].dataset.id
        console.log(_id)
        const calories = this.parentNode.childNodes[5].innerText
        console.log(calories)
        const meal = this.parentNode.childNodes[3].innerText
        console.log(meal)
        fetch('deleteMeal', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            '_id': _id,
            'calories': calories,
            'meal': meal
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
