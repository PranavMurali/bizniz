"use client"

import { searchContacts } from '@/actions/searchContacts';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconSearch, IconXboxXFilled, IconXboxX } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { BusinessCard } from '@/actions/getBusinessCard';

interface SearchFormProps {
    setActiveCard: (id: string) => void;
}

export function SearchForm({ setActiveCard }: Readonly<SearchFormProps>) {
    const [result, setResult] = useState<BusinessCard[]>([])

    const SearchFormSchema = z.object({
        searchQuery: z.string().nonempty("Search query should not be empty"),
    });

    const form = useForm<z.infer<typeof SearchFormSchema>>({
        resolver: zodResolver(SearchFormSchema),
        defaultValues: {
            searchQuery: "",
        }
    })


    async function onSubmit(values: z.infer<typeof SearchFormSchema>) {
        try {
            const res = await searchContacts({ searchQuery: values.searchQuery || "" })
            setResult(res)
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='w-96'>
            <ScrollArea className="rounded-md max-h-20 mb-2">
                {result.length > 0 && (
                    <div className="border-green-900 border rounded-md bottom-0 relative flex flex-col-reverse">
                        {result.map((res, i) => (
                            <div key={i}>
                                <div className="justify-between py-2 px-2">
                                    <div className='flex flex-row justify-between'>
                                        <button className="text-sm" onClick={() => setActiveCard(res.id)}>
                                            {res.name} - {res.title} - {res.company}
                                        </button>
                                        <IconXboxX className="right-2 h-4 w-4 text-muted-foreground" onClick={() => {
                                            setResult(result.filter((item) => item.id !== res.id))
                                        }} />
                                    </div>
                                </div>
                                <div>
                                    {i !== result.length - 1 &&
                                        <Separator className='bg-green-900' />
                                    }
                                </div>
                            </div>
                        ))}
                    </div>)}
            </ScrollArea>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="searchQuery"
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <FormControl>
                                    <div className="relative w-96">
                                        <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search" className="pl-8" {...field} />
                                        {result.length > 0 && <IconXboxXFilled className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" onClick={() => {
                                            setResult([])
                                            form.reset()
                                        }} />}
                                    </div>
                                </FormControl>
                                <div className="mt-2">
                                    <FormLabel>Who&apos;d you wanna find</FormLabel>
                                    <FormDescription>
                                        Search for a contact by any detail/tag
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>


        </div>
    );
};

export default SearchForm;