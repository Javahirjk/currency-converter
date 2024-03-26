import SearchBar, { searchForm } from '@/components/SearchBar';
import landingImage from '../assets/landingImage.png';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { useGetExchangeRate } from '@/api/CurrencyApi';
import TransactionList from '@/components/TransactionList';
import { Transaction } from '@/components/TransactionList'; 

export type CurrencyConverterProps = {
    fromCurrency: string;
    toCurrency: string;
}

const transactionss = [
    { fromCurrency: 'USD', toCurrency: 'EUR', amount: 100, date: '2022-01-01' },
    { fromCurrency: 'GBP', toCurrency: 'USD', amount: 200, date: '2022-02-01' },
    // more transactions...
  ];



const HomePage = () => {

    const [fromCurrency, setFromCurrency] = useState<string>('usd');
    const [toCurrency, setToCurrency] = useState<string>('inr');
    const [value, setValue] = useState<number>(0);
    const { exchangeRate } = useGetExchangeRate();
    const [updatedtrans, setUpdatedtrans] = useState<Transaction[]>([]);


    const handlerSearchSubmit = async (searchFormValues: searchForm) => {
        console.log(fromCurrency, toCurrency, searchFormValues);
        const data = await exchangeRate(fromCurrency);
        console.log("data javahir", parseFloat(searchFormValues.searchQuery) * (data[fromCurrency][toCurrency] as number));
        setValue(parseFloat(searchFormValues.searchQuery) * (data[fromCurrency][toCurrency] as number));

        
        const newTransaction = {
            date: new Date().toLocaleString(),
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            amount: parseFloat(searchFormValues.searchQuery),
            result: parseFloat(searchFormValues.searchQuery) * (data[fromCurrency][toCurrency] as number),
          };
    
          const updatedTransactions = [newTransaction, ...updatedtrans.slice(0, 4)];
          setUpdatedtrans(updatedTransactions);
          console.log("updatedTransactions", updatedtrans);
    }

    const handleFromCurrencyChange = (currency: string) => {
        setFromCurrency(currency);
        console.log("currency", currency);
    }

    const handleToCurrencyChange = (currency: string) => {
        setToCurrency(currency);
        console.log("currency", currency);
    }


    return (
        <div className="flex flex-col gap-12">
            <div className="px-2 md:px-10 lg:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-3xl font-bold tracking-tight text-orange-600">
                    Seamlessly Convert Currency
                </h1>
                <span className="text-xl">Is Just A Click Away!</span>
                <SearchBar placeholder='Enter Your Value Here...' onSubmit={handlerSearchSubmit} showSearchIcon={true} convertText='From' onChangeCurrency={(value) => handleFromCurrencyChange(value)} currencyType={fromCurrency} />
                <Separator />
                <SearchBar placeholder='' onSubmit={handlerSearchSubmit} showSearchIcon={false} convertText='To' onChangeCurrency={(value) => handleToCurrencyChange(value)} currencyType={toCurrency} value={value} />
            </div>
            <div className="px-2 md:px-10 lg:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <TransactionList transactions={updatedtrans} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={landingImage} className="rounded-lg" />
                <div className="flex flex-col items-center gap-4 text-center">
                    <span className="font-bold text-3xl tracking-tighter">
                        Convert Currency Event Faster
                    </span>
                    <span>
                        Convert currency with the most accurate exchange rates available.
                        Our currency converter is simple to use, and it's free!
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HomePage;