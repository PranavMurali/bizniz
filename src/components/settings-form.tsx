"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';

import { Button } from "@/components/ui/button";
import {
    FormDescription
} from "@/components/ui/form";
import { MultiSelect } from "@/components/ui/multi-select";
import { updateShareSettings } from "@/actions/updateSettings";
import { enqueueSnackbar } from 'notistack'
import { Mail, Phone, Building, Globe, MapPin, Tag, Captions, User } from "lucide-react";
import { getBusinessCard } from "@/actions/getBusinessCard";
import { useEffect } from "react";

const infoList = [
    { value: "name", label: "Name", icon: User },
    { value: "title", label: "Title", icon: Captions },
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
    { value: "company", label: "Company", icon: Building },
    { value: "website", label: "Website", icon: Globe },
    { value: "address", label: "Address", icon: MapPin },
    { value: "tags", label: "Tags", icon: Tag },
];
export const SettingSchema = z.object({
    shareception: z.boolean(),
    info_visibility: z.array(z.string())
});

export function SettingsForm({ settings, setSettings }) {

    const form = useForm<z.infer<typeof SettingSchema>>({
        resolver: zodResolver(SettingSchema),
        defaultValues: {
            shareception: true,
            info_visibility: [],
        }
    })
    const { setValue } = form
    async function onSubmit(values: z.infer<typeof SettingSchema>) {
        try {
            console.log("AHAHAHHAHAH", values)
            updateShareSettings(values)
            enqueueSnackbar("Settings updated", { variant: "success" })
        }
        catch (e) {
            console.error(e)
            enqueueSnackbar("Error updating settings", { variant: "error" })
        }
    }

    useEffect(() => {
        async function fetchData() {
            const bCard = await getBusinessCard()
            if (bCard.length > 0) {
                form.reset(bCard[0])
            }
        }
        fetchData()
    }, [])

    const setInfo = (value) => {
        setValue("info_visibility", value)
    }
    return (
        <AlertDialog open={settings}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Share Settings</AlertDialogTitle>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="shareception"
                                render={({ field }) => (
                                    <FormItem className="mt-2">
                                        <FormLabel>Can your Contacts share your card </FormLabel>
                                        <FormControl>
                                            <Checkbox {...field}
                                                checked={form.getValues("shareception")}
                                                onCheckedChange={(value) => {
                                                    field.onChange(value);
                                                }}
                                                className="ml-2" />
                                        </FormControl>
                                        <FormDescription>
                                            [Warning...] This can cause a shareception.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="info_visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>What do you want people to see? </FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                {...field}
                                                modalPopover={true}
                                                options={infoList}
                                                onValueChange={setInfo}
                                                defaultValue={form.getValues("info_visibility")}
                                                placeholder="Select frameworks"
                                                variant="inverted"
                                                animation={0}
                                                maxCount={3}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row justify-between">
                                <Button type="submit">Submit</Button>
                                <AlertDialogAction onClick={() => setSettings(false)}>Finish</AlertDialogAction>
                            </div>
                        </form>
                    </Form>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SettingsForm;