import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', () => {
    loadPrices();

    document.getElementById('priceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const priceInput = document.getElementById('price');
        const price = parseFloat(priceInput.value);
        
        // Show loading spinner
        const submitBtn = document.getElementById('submitBtn');
        const spinner = document.getElementById('submitSpinner');
        submitBtn.disabled = true;
        spinner.classList.remove('d-none');

        try {
            await backend.addPrice(price);
            priceInput.value = '';
            await loadPrices();
        } catch (error) {
            console.error('Error adding price:', error);
            alert('Failed to add price. Please try again.');
        } finally {
            submitBtn.disabled = false;
            spinner.classList.add('d-none');
        }
    });

    document.getElementById('averageBtn').addEventListener('click', async () => {
        const averageBtn = document.getElementById('averageBtn');
        const spinner = document.getElementById('averageSpinner');
        const averagePrice = document.getElementById('averagePrice');
        
        averageBtn.disabled = true;
        spinner.classList.remove('d-none');
        averagePrice.classList.add('d-none');

        try {
            const average = await backend.getAveragePrice();
            if (average === null) {
                averagePrice.textContent = 'No prices available to calculate average';
            } else {
                averagePrice.textContent = `Average Price: $${average.toFixed(2)}`;
            }
            averagePrice.classList.remove('d-none');
        } catch (error) {
            console.error('Error calculating average:', error);
            alert('Failed to calculate average price. Please try again.');
        } finally {
            averageBtn.disabled = false;
            spinner.classList.add('d-none');
        }
    });
});

async function loadPrices() {
    const loadingHistory = document.getElementById('loadingHistory');
    const priceTableBody = document.getElementById('priceTableBody');
    
    loadingHistory.classList.remove('d-none');

    try {
        const prices = await backend.getPrices();
        
        // Clear existing table rows
        priceTableBody.innerHTML = '';
        
        // Add new rows
        prices.forEach(entry => {
            const row = document.createElement('tr');
            const date = new Date(Number(entry.timestamp) / 1000000); // Convert nanoseconds to milliseconds
            
            row.innerHTML = `
                <td>${date.toLocaleString()}</td>
                <td>$${entry.price.toFixed(2)}</td>
            `;
            
            priceTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading prices:', error);
        alert('Failed to load prices. Please refresh the page.');
    } finally {
        loadingHistory.classList.add('d-none');
    }
}
