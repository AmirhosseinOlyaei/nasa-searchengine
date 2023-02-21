//# 1. Bring in all DOM elements (#search-box & #images)
const searchBoxEl = document.querySelector('#search-box');
const imageResults = document.querySelector('#images');

// console.log(searchBoxEl)
// console.log(imageResults)

async function getNASAImages(userInput) {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${userInput}`);
    const data = await response.json()

    return data.collection.items;
}

//# 2a. listen for the "Enter" key press on the #search-box
function displayImage(image) {
    const div = document.createElement('div');

    div.classList.add('p-6', 'bg-amber-300', 'rounded-lg')
    div.innerHTML = `
    <img src="${image.links[0].href}">
    <p class="font-bold text-lg">${image.data[0].title}</p>
    <p class="text-xs">${image.data[0].description}</p>
    `
    imageResults.appendChild(div);

    // DOM Tree
}

searchBoxEl.addEventListener('keypress', async (event) => {
    //# 2b. listen the "Enter" on the keyboard

    if (event.key === 'Enter') {
        //# 3. When a user hits enter on their keyboard, send an API request to NASA to get all images
        const allNasaImages = await getNASAImages(event.target.value);

        const imagesToShow = allNasaImages.slice(0, 8);
        imagesToShow.forEach(image => displayImage(image));
    }
});

//# 2a. listen for the "Enter" key press on the #search-box
// searchBoxEl.addEventListener('keypress', (event) => {
//     //# 2b.  listen the "Enter" on the keyboard
//     if (event.key === 'Enter') {

//         // console.log(`You just HIT the Enter key.....`)
//         // console.log(event.key);
//         // console.log(event.code);


//         //# 3. When a user hits enter on their keyboard, send an API request to NASA to get all images
//         // https://images-api.nasa.gov/search?q={q}
//         //     console.log( event.target )
//         // console.log("Value user typed:", event.target.value)
//         //
//         // // use the value the user types to send an API GET  request...
//         fetch(`https://images-api.nasa.gov/search?q=${event.target.value}`)
//             .then(response => response.json())
//             .then(data => {

//                 // same the images key in this array
//                 const images = data.collection.items

//                 // console.log("image title:", images[0].data[0].title)
//                 // console.log("image description:", images[0].data[0].description)
//                 // console.log("image description:", images[0].links[0].href)

//                 // 4. when the images comes back, display to user in the #images by .appendChild()
//                 const displayItems = images.slice(0, 8);

//                 imageResults.innerHTML = ''
//                 displayItems.forEach( image => displayImage(image) );

//                 // displayImage(images[0])
//             })
//             .catch(err => {
//                 console.log(err);
//             })
//     }
// });

// function displayImage(image) {
//     const div = document.createElement('div');

//     div.classList.add('p-6', 'bg-amber-300', 'rounded-lg')
//     div.innerHTML = `
//      <img src="${image.links[0].href}">
//       <p class="font-bold text-lg">${image.data[0].title}</p>
//     <p class="text-xs">${image.data[0].description}</p>
//     `
//     imageResults.appendChild(div);
// }