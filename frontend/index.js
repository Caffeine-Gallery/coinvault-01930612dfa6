import { backend } from "declarations/backend";

document.addEventListener('DOMContentLoaded', () => {
    loadPrices();

    document.getElementById('priceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const priceInput = document.getElementById('price');
        const price = parseFloat(priceInput.value);
        
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
            const averageResult = await backend.getAveragePrice();
            if (averageResult.length === 0 || averageResult[0] === null) {
                averagePrice.textContent = 'No prices available to calculate average';
            } else {
                const average = Number(averageResult[0]);
                const roundedAverage = Math.round(average * 100) / 100;
                averagePrice.textContent = `Average Price: $${roundedAverage}`;
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

    document.getElementById('highestBtn').addEventListener('click', async () => {
        const highestBtn = document.getElementById('highestBtn');
        const spinner = document.getElementById('highestSpinner');
        const highestPrice = document.getElementById('highestPrice');
        
        highestBtn.disabled = true;
        spinner.classList.remove('d-none');
        highestPrice.classList.add('d-none');

        try {
            const highestResult = await backend.getHighestPrice();
            if (highestResult.length === 0 || highestResult[0] === null) {
                highestPrice.textContent = 'No prices available';
            } else {
                const highest = Number(highestResult[0]);
                const roundedHighest = Math.round(highest * 100) / 100;
                highestPrice.textContent = `Highest Price: $${roundedHighest}`;
            }
            highestPrice.classList.remove('d-none');
        } catch (error) {
            console.error('Error getting highest price:', error);
            alert('Failed to get highest price. Please try again.');
        } finally {
            highestBtn.disabled = false;
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
        
        priceTableBody.innerHTML = '';
        
        prices.forEach(entry => {
            const row = document.createElement('tr');
            const date = new Date(Number(entry.timestamp) / 1000000);
            const price = Number(entry.price);
            const roundedPrice = Math.round(price * 100) / 100;
            
            row.innerHTML = `
                <td>${date.toLocaleString()}</td>
                <td>$${roundedPrice}</td>
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
