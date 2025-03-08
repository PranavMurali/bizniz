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
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

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
        }
        catch (e) {
            console.error(e)
        }
    }

    return (
        <div className='w-96'>
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
                </form>
            </Form>

            <ScrollArea className="rounded-md border mt-2">
                {result.length > 0 && (
                    <div className="p-4">
                        {result.map((res, i) => (
                            <div key={i}>
                                <button className="text-sm" onClick={() => setActiveCard(res.id)}>
                                    {res.name} - {res.title} - {res.company}
                                </button>
                                {i !== result.length - 1 &&
                                    <Separator className="my-2" />
                                }
                            </div>
                        ))}
                    </div>)}
            </ScrollArea>
        </div>
    );
};

export default SearchForm;