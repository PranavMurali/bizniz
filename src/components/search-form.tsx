"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchContacts } from '@/actions/searchContacts';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { IconSearch } from '@tabler/icons-react';

export function SearchForm({ setActiveCard }) {
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState([])

    const SearchFormSchema = z.object({
        searchQuery: z.string().optional(),
    });

    const form = useForm<z.infer<typeof SearchFormSchema>>({
        resolver: zodResolver(SearchFormSchema),
        defaultValues: {
            searchQuery: "",
        }
    })


    async function onSubmit(values: z.infer<typeof SearchFormSchema>) {
        try {
            console.log(values)
            const res = await searchContacts(values)
            setResult(res)
            console.log(res, "SEARCH")
            setActiveCard(res[0].id)
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-row">
                    <FormField
                        control={form.control}
                        name="searchQuery"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Who'd you wanna find</FormLabel>
                                <FormControl>
                                    <div className="relative mt-20 w-96">
                                        <IconSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search" className="pl-8" {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
            <div>
                {result.length > 0 && result.map((res, i) => (
                    <div key={i}>
                        <p>{res.name}</p>
                        <p>{res.title}</p>
                        <p>{res.email}</p>
                        <p>{res.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchForm;