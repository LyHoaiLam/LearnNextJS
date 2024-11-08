'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import envConfig from "@/config"

const formSchema = z.object({
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
})

type FormValues = z.infer<typeof formSchema>
    
async function onSubmit(values: FormValues) {
    const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register`, {
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then((res) => res.json())
    console.log(values)
    console.log(result)
}


const RegisterFrom = () => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        },
    })

    return (
        <div className="">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (error) => {
                    console.log("onInValid Chạy nêu Form lỗi")

                })} className="space-y-2 w-full flex-shrink max-w-[600px]">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>confirmPassword</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="confirmPassword" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                    )}
                    />

                    <Button onClick={() => onSubmit} className="!mt-8 w-full" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default RegisterFrom