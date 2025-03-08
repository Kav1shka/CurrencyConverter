import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const EXCHANGE_RATE_API_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_RATE_API_KEY}/latest/`;

/**
 * Fetch exchange rate between two currencies
 * @param {string} fromCurrency - Base currency (e.g., "USD")
 * @param {string} toCurrency - Target currency (e.g., "LKR")
 * @returns {Promise<number>} - Exchange rate value
 */
export const getExchangeRate = async (fromCurrency, toCurrency) => {
    try {
        const response = await axios.get(`${EXCHANGE_RATE_API_URL}${fromCurrency}`);
        
        if (response.data && response.data.conversion_rates) {
            return response.data.conversion_rates[toCurrency] || null;
        }
        throw new Error('Invalid response from ExchangeRate-API');
    } catch (error) {
        console.error(`Error fetching exchange rate: ${error.message}`);
        throw new Error('Failed to fetch exchange rate');
    }
};

/**
 * Convert currency using the exchange rate
 * @param {string} fromCurrency - Base currency (e.g., "USD")
 * @param {string} toCurrency - Target currency (e.g., "LKR")
 * @param {number} amount - Amount in base currency
 * @returns {Promise<number>} - Converted amount
 */
export const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    
    if (!exchangeRate) {
        throw new Error('Exchange rate not available');
    }
    
    return amount * exchangeRate;
};
