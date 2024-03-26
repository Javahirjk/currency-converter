import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CurrencyDropdown from "./CurrencyDropdown";


const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Please enter a search term",
    })
});

export type searchForm = z.infer<typeof formSchema>;


type Props = {
    onSubmit: (formData: searchForm) => void;
    placeholder: string;
    onReset?: () => void;
    searchQuery?: string;
    showSearchIcon: boolean;
    convertText: string;
    onChangeCurrency: (currency: string) => void;
    currencyType: string;
    value?: number;
}

export type SearchState = {
    searchQuery: string;
}

const SearchBar = ({ placeholder, searchQuery, onReset, onSubmit, showSearchIcon, convertText, onChangeCurrency, currencyType, value }: Props) => {



    const form = useForm<searchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery
        }
    });


    const setCurrencyOption = (value: string) => {
        onChangeCurrency(value);
    }

    useEffect(() => {
        form.reset({ searchQuery : value?.toFixed(2).toString() });
    }, [form, searchQuery, value])

    const handleReset = () => {
        form.reset({
            searchQuery: ""
        });
        onReset?.();
    }

    return (
        <Form {...form}>
            <form className={`flex flex-wrap items-center gap-3 justify-between flex-row border-2 rounded-lg md:rounded-full p-3`}>
                <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
                <CurrencyDropdown currency={currencyType} onChange={(value) => setCurrencyOption(value)} convertText={convertText} />
                <FormField control={form.control} name="searchQuery" render={({ field }) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input {...field} className="border-none shadow-none text-xl focus-visible:ring-0" placeholder={placeholder}  />
                        </FormControl>
                    </FormItem>
                )} />

                <Button type="button" variant="outline" className="rounded-full" onClick={handleReset}>Reset</Button>

                {showSearchIcon && <Button type="button" onClick={() => onSubmit({ searchQuery: form.getValues('searchQuery') })} className="bg-orange-500 text-white rounded-full px-4 py-2" >Search</Button>}

            </form>
        </Form>
    )

}

export default SearchBar;