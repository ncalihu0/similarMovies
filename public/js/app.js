const userInput = document.getElementById('userInput');
const submit = document.getElementById('submit');
const message = document.getElementById('message');
const list = document.getElementById('grid');



submit.addEventListener('click', (e) => {
    e.preventDefault();
    const movie = (userInput.value)

    list.innerHTML = '';
    fetch('http://localhost:3000/similar?movie=' + movie).then((response) => {
        //.json() is used to return our respose data into a Javascript object, which could be
        //an object, an array, a string, a number, and so on
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error;
            } else {
                for (let i = 0; i < data.similar.length; i++) {
                    // Create a container div for each recommendation and image
                    let container = document.createElement('section');
                    container.className = 'similar-container';

                    // Create an image element
                    let imageElement = document.createElement('img');
                    imageElement.src = data.images[i];
                    imageElement.alt = data.similar[i];
                    container.appendChild(imageElement);

                    // Create a paragraph element for the title
                    let titleElement = document.createElement('p');
                    titleElement.textContent = data.similar[i];
                    container.appendChild(titleElement);

                    // Append the container to the main list
                    list.appendChild(container);
                }
            }
        })
    })

})
