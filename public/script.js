async function getProducts(){
  const address = "http://localhost:3000/api/products";
  const response = await fetch(address);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return response.json();
}

async function showProducts(products) {
    const list = document.querySelector("#products") // Stores the list with the ID
    list.innerHTML = ""; // Removes everything inside the list by setting it to nothing
    if (products.length === 0) { // Checks if there are no repositories
        list.textContent = "No public products found."; // Shows this text on the HTML 
        return; // Exits the function
    }
    for (const product of products) { // It is a loop going through all the repositories in the array
        const item = document.createElement("li") // This creates a new HTML list element
        const link = document.createElement("a") // This creates a new HTML link element
        link.href = product.html_url; // This makes the URL go into the link element
        link.textContent = `${product.name} - £${product.price.toFixed(2)} - ${product.category} (${product.stock > 0 ? 'In stock' : 'Sold out'})`; // This makes the repo name the links clickable text
        item.append(link); // Puts the link inside the list item
        list.append(item); // Adds the list onto the webpage
    }
}

async function init(){
    try{ // try to run the code
    showProducts(await getProducts()) // This runs the functions, gets the repositories and displays them on the page
    } catch(error){ // catches the error
        console.error(error) // Logs the error on the console
        document.querySelector("#products").textContent= "Sorry, The product could not be loaded"; // Show a error message on the webpage
    }
}
init();