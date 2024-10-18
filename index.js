// Declare the external API URL
const api = "https://food-8bjw.onrender.com/Food";

// Function to render a single food item
function renderOneFood(Food) {
  const foodMenu = document.getElementById('Food-menu'); // Updated ID

  const foodItem = document.createElement('div'); // Created the div element within food menu
  foodItem.classList.add('food-item'); // Added a class list for this div

  const foodImage = document.createElement('img');
  foodImage.src = Food.image; // Sets the URL for the image
  foodImage.alt = Food.name; // Sets the name
  foodItem.appendChild(foodImage); // Adds the info onto food item

  const foodName = document.createElement('h4'); // Creates h4 element
  foodName.textContent = Food.name; // Sets the food name
  foodItem.appendChild(foodName); // Pushes the info into food item

  // Attach click event to each food item
  foodItem.addEventListener('click', () => handleClick(Food)); // Adds the click event

  foodMenu.appendChild(foodItem); 

  // Create Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the click on foodItem
      fetch(`${api}/${Food.id}`, {
        method: 'DELETE',
      })
      .then(() => {
        foodMenu.removeChild(foodItem); // Remove item from menu
      })
      .catch(error => console.error('Error deleting food item:', error));
  });
  foodItem.appendChild(deleteButton);

  // Create Edit Button
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent triggering the click on foodItem
      populateForm(Food); // Populate the form with the food item
  });
  foodItem.appendChild(editButton);
}

// Function to populate the form with food item data
const populateForm = (Food) => {
   const form = document.getElementById('new-comments'); // Updated ID
   form.name.value = Food.name;
   form.restaurant.value = Food.restaurant;
   form.image.value = Food.image;
   form.rating.value = Food.rating;
   form['new-comment'].value = Food.comment;
};

// Function to handle click on food item
const handleClick = (Food) => {
  const detailImage = document.querySelector('.detail-image');
  const nameDisplay = document.querySelector('.name');
  const restaurantDisplay = document.querySelector('.restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = Food.image;
  nameDisplay.textContent = Food.name;
  restaurantDisplay.textContent = Food.restaurant;
  ratingDisplay.textContent = Food.rating;
  commentDisplay.textContent = Food.comment;
};

// Function to add submit listener to the form
const addSubmitListener = () => {
  const form = document.getElementById('new-comments'); // Updated ID

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newFood = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: parseInt(event.target.rating.value),
      comment: event.target['new-comment'].value,
    };

    // Send the new food item to the API
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFood),
    })
    .then(res => res.json())
    .then(addedFood => {
      renderOneFood(addedFood); // Render the added food item
      form.reset(); // Reset the form
    })
    .catch(error => console.error('Error adding food item:', error));
  });
};

// Function to fetch and display all food
const displayFoods = () => {
  fetch(api)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(foods => foods.forEach(food => renderOneFood(food)))
    .catch(error => console.error('Error fetching foods:', error));
};

// Main function to start the program
const main = () => {
  displayFoods();
  addSubmitListener();
};

// Ensure the DOM is fully loaded before running the main function
document.addEventListener('DOMContentLoaded', main);



//json-server --watch db.json
