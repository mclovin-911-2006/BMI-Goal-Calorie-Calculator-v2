const form = document.getElementById('calcForm');
const result = document.getElementById('result');
const output = document.getElementById('output');
const back = document.getElementById('back');

const diets = {
  gain: `
  <h3>Weight Gain Diet</h3>

  <div>
    <img src="./tsawer/1583516899411.webp" style="width:200px; height:150px">
    <p><strong>Meal:</strong> Chicken Quinoa Bowl<br>
       <strong>Recipe:</strong> Chicken breast, quinoa, avocado, olive oil<br>
       <strong>Macros:</strong> 600 kcal, 40g protein, 60g carbs, 20g fat
    </p>
  </div>
  
  <div>
    <img src="./tsawer/bbq_spiced_steak_mashed_sweet_potatoes-7022f2d151976ea46a958c1a1c07a711.jpeg" style="width:200px; height:150px">
    <p><strong>Meal:</strong> Peanut Butter Banana Smoothie<br>
       <strong>Recipe:</strong> Banana, peanut butter, milk, oats<br>
       <strong>Macros:</strong> 500 kcal, 20g protein, 50g carbs, 25g fat
    </p>
  </div>
  
  <div>
    <img src="./tsawer/peanut-butter-banana-smoothie-bowl-1500-14-square.jpg" style="width:200px; height:150px">
    <p><strong>Meal:</strong> Steak & Sweet Potato<br>
       <strong>Recipe:</strong> Lean steak, roasted sweet potato, broccoli<br>
       <strong>Macros:</strong> 650 kcal, 45g protein, 60g carbs, 22g fat
    </p>
  </div>
  
    </div>
    <h3>Exercises</h3>
    <p>Strength training 4–5 times a week, progressive overload, compound lifts.</p>
  `,
  lose: `
    <h3>Weight Loss Diet</h3>
    <div>
    <img src="./tsawer/Simple-Green-Salad-with-Vinaigrette-Square-FS-3241.jpg" style="width:200px; height:150px">
      <p><strong>Meal:</strong> Simple Green Salad<br>
      <strong>Recipe:</strong> Lettuce, cucumber, tomato, grilled chicken, light dressing<br>
      <strong>Macros:</strong> 350 kcal, 30g protein, 20g carbs, 10g fat</p>
    </div>
    <div>
    <img src="./tsawer/5544320-04f567e988ce416dadc24ba38716147d.jpg" style="width:200px; height:150px">
      <strong>Recipe:</strong> Salmon fillet, steamed vegetables, olive oil<br>
      <strong>Macros:</strong> 400 kcal, 35g protein, 20g carbs, 15g fat</p>
    </div>
    <div>
    <img src="./tsawer/Chicken-Stir-Fry-main-500x500.jpg" style="width:200px; height:150px">
      <p><strong>Meal:</strong> Chicken Stir Fry<br>
      <strong>Recipe:</strong> Chicken breast, bell peppers, broccoli, soy sauce<br>
      <strong>Macros:</strong> 380 kcal, 32g protein, 25g carbs, 12g fat</p>
    </div>
    <h3>Exercises</h3>
    <p>Cardio 3–4 times a week, strength training 2–3 times a week, stay active daily.</p>
  `,
  maintain: `
    <h3>Maintenance Diet</h3>
    <div>
      <img src="https://www.eatingwell.com/thmb/7i-BDKfCbm9w_0foF9r_6lmuz0Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/avocado-toast-hero-bd82914839a242c9a2f2441993001c26.jpg" width="200">
      <p><strong>Meal:</strong> Avocado Toast<br>
      <strong>Recipe:</strong> Whole grain bread, avocado, egg<br>
      <strong>Macros:</strong> 400 kcal, 20g protein, 35g carbs, 15g fat</p>
    </div>
    <div>
      <img src="https://www.eatingwell.com/thmb/6bZpB2EoWZYUoR-T0kN3Hh03l9Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greek-yogurt-fruit-bowl-9c70bfa17de849178e8f2b57c10f882d.jpg" width="200">
      <p><strong>Meal:</strong> Greek Yogurt & Fruit Bowl<br>
      <strong>Recipe:</strong> Greek yogurt, mixed berries, honey, granola<br>
      <strong>Macros:</strong> 350 kcal, 20g protein, 40g carbs, 10g fat</p>
    </div>
    <div>
      <img src="https://www.eatingwell.com/thmb/8NwPplxjXq9H7zFczZHLkC8WZpY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/grilled-chicken-quinoa-hero-9a69c9f3b84b4db3a4f7590a5e64a08e.jpg" width="200">
      <p><strong>Meal:</strong> Grilled Chicken & Quinoa<br>
      <strong>Recipe:</strong> Chicken breast, quinoa, spinach, olive oil<br>
      <strong>Macros:</strong> 500 kcal, 40g protein, 45g carbs, 15g fat</p>
    </div>
    <h3>Exercises</h3>
    <p>Balanced mix of cardio and strength training 3–4 times a week.</p>
  `
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const weight = parseFloat(form.weight.value);
  const height = parseFloat(form.height.value) / 100;
  const gender = form.gender.value;
  const age = parseInt(form.age.value);
  const target_weight = parseFloat(form.target_weight.value);
  const weeks = parseInt(form.weeks.value);

  if(weight <= 0 || height <= 0 || target_weight <= 0 || weeks <= 0){
    alert('Enter reasonable positive values');
    return;
  }

  const bmi = (weight / (height * height)).toFixed(2);
  let category = '';
  if(bmi < 18.5) category = 'Underweight';
  else if(bmi < 25) category = 'Normal weight';
  else if(bmi < 30) category = 'Overweight';
  else category = 'Obese';

  let bmr;
  if(gender === 'male') bmr = 88.36 + (13.4 * weight) + (4.8 * height*100) - (5.7 * age);
  else bmr = 447.6 + (9.2 * weight) + (3.1 * height*100) - (4.3 * age);

  const tdee = Math.round(bmr * 1.55);
  const weight_diff = target_weight - weight;
  const total_calories = weight_diff * 7700;
  const daily_calorie_change = Math.round(total_calories / (weeks * 7));
  const recommended_calories = tdee + daily_calorie_change;

  let note = '';
  if(recommended_calories < 1200) note = 'Calories too low to be safe';
  else if(recommended_calories > 4000) note = 'Calories too high to be safe';
  else note = 'Plan looks reasonable';

  let dietPlan = '';
  if(weight_diff > 0) dietPlan = diets.gain;
  else if(weight_diff < 0) dietPlan = diets.lose;
  else dietPlan = diets.maintain;

  output.innerHTML = `
    <p><strong>BMI:</strong> ${bmi}</p>
    <p><strong>Category:</strong> ${category}</p>
    <p><strong>Daily calories to maintain (TDEE):</strong> ${tdee} kcal</p>
    <p><strong>Daily calories recommended:</strong> ${recommended_calories} kcal</p>
    <p><strong>Daily calorie change:</strong> ${daily_calorie_change} kcal</p>
    <p><strong>Notes:</strong> ${note}</p>
    ${dietPlan}
  `;
  form.hidden = true;
  result.hidden = false;
});

back.addEventListener('click', () => {
  form.hidden = false;
  result.hidden = true;
  form.reset();
});
