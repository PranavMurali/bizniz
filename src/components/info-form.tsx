"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateCard } from "@/actions/updateCard"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getBusinessCard } from "@/actions/getBusinessCard"
import { Textarea } from "./ui/textarea"
import { useRouter } from 'next/navigation'
import { Tag, TagInput } from 'emblor';


export const infoFormSchema = z.object({
  name: z.string().optional(),
  userId: z.string().optional(),
  email: z.string().email({
    message: "Email must be a valid email address.",
  }).optional(),
  ownedBy: z.string().optional(),
  title: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().optional(),
  address: z.string().optional(),
  tags: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
    }),
  ),
  shareception: z.boolean().optional(),
  info_visibility: z.array(z.string())
})

export const alertSchema = z.object({
  type: z.enum(["success", "error"]),
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
})

export function ProfileInfoForm() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [tags, setTags] = useState<Tag[]>([])
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [alert, setAlert] = useState<z.infer<typeof alertSchema>>({
    type: "success",
    title: "",
    message: "",
  })

  useEffect(() => {
    async function fetchData() {
      const bCard = await getBusinessCard()
      if (bCard.length > 0) {
        form.reset(bCard[0])
        setTags(bCard[0].tags)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  const form = useForm<z.infer<typeof infoFormSchema>>({
    resolver: zodResolver(infoFormSchema),
    defaultValues: {
      name: "",
      email: "",
      title: "",
      phone: "",
      company: "",
      website: "",
      address: "",
      tags: [],
      shareception: true,
      info_visibility: [
        "name",
        "title",
        "email",
        "phone",
        "company",
        "address",
        "tags",
        "website"
      ],
    }
  })

  const { setValue } = form;

  async function onSubmit(values: z.infer<typeof infoFormSchema>) {
    try {
      await updateCard(values)
      setAlert({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated.",
      })
    }
    catch (e) {
      console.error(e)
      setAlert({
        type: "error",
        title: "Profile Update Failed",
        message: "There was an error updating your profile.",
      })
    }
    setOpen(true)
  }


  return (
    <AlertDialog open={open}>
      {isLoading ? <div>Loading...</div> : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your full name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your email address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your professional title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your contact number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 lg:grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of your company.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6 md:col-span-2 lg:col-span-3">
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Website" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your company's website URL.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your business address.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left">Topics</FormLabel>
                  <FormControl className="w-full">
                    <TagInput
                      {...field}
                      placeholder="Enter a topic"
                      tags={tags}
                      setTags={(newTags) => {
                        setTags(newTags);
                        setValue('tags', newTags as [Tag, ...Tag[]]);
                      }}
                      activeTagIndex={activeTagIndex}
                      setActiveTagIndex={setActiveTagIndex}
                      textStyle={
                        "bold"
                      }
                      shape={
                        "rounded"
                      }
                      styleClasses={
                        {
                          tag: {
                            body: "pl-2",
                          }
                        }
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-left">
                    These are the topics that you&apos;re interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )
      }
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alert?.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {alert?.message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => { setOpen(false) }}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => { router.push("/") }}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog >
  )
}
