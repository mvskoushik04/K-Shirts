/*async function fetchUserName() {
    try {
        // Fetch the user's information
        const response = await fetch('http://localhost:3000/get-user',{
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Not authenticated');
        }
        const data = await response.json();

        // Update the navigation bar with user's name or "Sign In"
        const userNameElement = document.getElementById('user-name');
        if (data.success) {
            userNameElement.innerText = `Hi, ${data.userName}`; // Display the user's name
            userNameElement.href = "#"; // Optionally disable the link
        } else {
            userNameElement.innerText = "Sign In"; // Default to "Sign In"
            userNameElement.href = "signin.html"; // Ensure redirection to the sign-in page
        }
    } catch (error) {
        console.error('Error fetching user name:', error);

        // Default to "Sign In" if an error occurs
        const userNameElement = document.getElementById('user-name');
        userNameElement.innerText = "Sign In";
        userNameElement.href = "signin.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".product button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            alert("Added to cart!");
        });
    });

    fetchUserName(); // Fetch and display the user's name or default to "Sign In"
});
*/
async function fetchUserName() {
    try {
        // Fetch the user's session data
        const response = await fetch('http://localhost:3000/index', {
            method: 'GET',
            credentials: 'include', // Include cookies for session management
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error('Not authenticated');
        }

        const data = await response.json();

        // Update the navigation bar based on the session state
        const userNameElement = document.getElementById('user-name');
        if (data.success) {
            userNameElement.innerText = `Hi, ${data.userName}`; // Display the user's name
            userNameElement.href = "#"; // Optionally disable the link or point to profile
        } else {
            throw new Error('Session invalid');
        }
    } catch (error) {
        console.error('Error fetching user name:', error);

        // Default to "Sign In" if an error occurs
        const userNameElement = document.getElementById('user-name');
        userNameElement.innerText = "Sign In";
        userNameElement.href = "signin.html"; // Redirect to sign-in page
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Add event listeners for buttons (e.g., Add to Cart)
    const buttons = document.querySelectorAll(".product button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            alert("Added to cart!");
        });
    });

    // Fetch and display the user's session-based information
    fetchUserName();
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products and combos');
        }

        const data = await response.json();

        if (data.success) {
            // Populate Products
            const productsContainer = document.querySelector('.products');
            productsContainer.innerHTML = ''; // Clear existing content

            data.products.forEach((product) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.innerHTML = `
                    <img src="${product.image_url}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button>Add to Cart</button>
                `;
                productsContainer.appendChild(productDiv);
            });

            // Populate Combos
            const combosContainer = document.querySelector('.combos');
            combosContainer.innerHTML = ''; // Clear existing content

            data.combos.forEach((combo) => {
                const comboDiv = document.createElement('div');
                comboDiv.classList.add('product');
                comboDiv.innerHTML = `
                    <img src="${combo.image_url}" alt="${combo.name}">
                    <h3>${combo.name}</h3>
                    <p>$${combo.price.toFixed(2)}</p>
                    <button>Add to Cart</button>
                `;
                combosContainer.appendChild(comboDiv);
            });
        }
    } catch (error) {
        console.error('Error fetching products and combos:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically fetch and display products and combos
    fetchProducts();
});



