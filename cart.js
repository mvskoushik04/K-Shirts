// Sample data for the coupon codes and their discounts
const coupons = {
    "SAVE10": 10,
    "SAVE20": 20,
    "DISCOUNT30": 30,
    "OFFER50": 50,
    "BLACKFRIDAY": 40
};

let subtotal = 35;
let discount = 0;
let finalPrice = subtotal;

// Update the subtotal dynamically when quantity changes
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('change', () => {
        const quantity1 = parseInt(document.getElementById('quantity1').value);
        const quantity2 = parseInt(document.getElementById('quantity2').value);

        // Assuming the prices for the two products are $20 and $15
        subtotal = (quantity1 * 20) + (quantity2 * 15);
        document.getElementById('subtotal').innerText = `Subtotal: $${subtotal}`;
        finalPrice = subtotal - discount;
        document.getElementById('final-price').innerText = `Final Price: $${finalPrice}`;
    });
});

// Function to remove item from cart
function removeItem(itemId) {
    const item = document.getElementById(itemId);
    if (item) {
        item.remove();
        updateSubtotal();
    }
}

// Function to update the subtotal
function updateSubtotal() {
    const quantity1 = parseInt(document.getElementById('quantity1').value);
    const quantity2 = parseInt(document.getElementById('quantity2').value);
    subtotal = (quantity1 * 20) + (quantity2 * 15);
    document.getElementById('subtotal').innerText = `Subtotal: $${subtotal}`;
    finalPrice = subtotal - discount;
    document.getElementById('final-price').innerText = `Final Price: $${finalPrice}`;
}

// Apply the coupon code
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value;
    if (coupons[couponCode]) {
        discount = coupons[couponCode];
        document.getElementById('coupon-message').innerText = `Coupon applied: -$${discount}`;
        finalPrice = subtotal - discount;
        document.getElementById('discount').innerText = `Discount: -$${discount}`;
        document.getElementById('final-price').innerText = `Final Price: $${finalPrice}`;
    } else {
        document.getElementById('coupon-message').innerText = "Invalid coupon code!";
    }
}

// Event listener for the 'Update Price' button
document.getElementById('update-btn').addEventListener('click', updateSubtotal);

// Event listener for the 'Proceed to Checkout' button
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert(`Proceeding to checkout with a final price of $${finalPrice}`);
});
