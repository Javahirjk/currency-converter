import { useMutation, useQuery } from "react-query";


export type CurrencyRates = {
    [key: string]: {
        [key: string]: number | string;
    };
};

export const useGetAllCurrencies = () => {
    const getAllCurrencies = async (): Promise<{ [key: string]: string }> => {
        const respose = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json');

        if (!respose.ok) {
            throw new Error('Failed to fetch currencies');
        }

        return respose.json();
    }

    const { data: currencies, error, isLoading } = useQuery('fetchCurrencies', getAllCurrencies);
    return { currencies, error, isLoading };
};

export type Currency = {
    label: string;
    value: string;
};

export type Currencies = Currency[];

export const useGetAllCurrenciesModified = () => {
    const getAllCurrencies = async (): Promise<Currencies> => {
        const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json');

        if (!response.ok) {
            throw new Error('Failed to fetch currencies');
        }

        const data = await response.json();

        // Transform the data into the desired format
        //const transformedData: Currencies = Object.entries(data).map(([value, label]) => ({ label: String(label), value }));
        const transformedData: Currencies = Object.entries(data)
            .map(([value, label]) => ({ label: String(label), value }))
            .filter(currency => currency.label !== "");
        return transformedData;
    }

    const { data: currencies, error, isLoading } = useQuery('fetchCurrencies', getAllCurrencies);
    return { currencies, error, isLoading };
};

export const useGetExchangeRate = () => {
    const getExchangeRate = async (fromCurrency: string): Promise<CurrencyRates> => {

        const response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`);

        if (!response.ok) {
            throw new Error('Failed to fetch exchange rate');
        }

        return response.json();

    }

    const { mutateAsync: exchangeRate, error, isLoading } = useMutation('fetchExchangeRate', getExchangeRate);
    return { exchangeRate, error, isLoading };

}