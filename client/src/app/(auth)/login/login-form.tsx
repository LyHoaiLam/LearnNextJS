'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import envConfig from "@/config"
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/app/AppProvider"

const LoginForm = () => {
    const { toast } = useToast()
    const {setSessionToken} = useAppContext();

    const formSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(100),
    })
        
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    })
    
    type FormValues = z.infer<typeof formSchema>
        
    async function onSubmit(values: FormValues) {
        try {
    
            const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }).then(async (res) => {
            const payload = await res.json()
        
            const data = {
                status: res.status,
                payload
            }
        
            if(!res.ok) {
                throw data
            }
        
            return data
        })

        toast({
            description: result.payload.message
        })

        // console.log(result)

        const resultFromNextServer = await fetch('/api/auth/', {
            method: 'POST',
            body: JSON.stringify(result),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const payload = await res.json()
        
            const data = {
                status: res.status,
                payload
            }
        
            if(!res.ok) {
                throw data
            }
        
            return data
        })

        console.log(resultFromNextServer.payload.data.token)
        setSessionToken(resultFromNextServer.payload.data.token);

        
        } catch (error: any) {
    
            const errors = error.payload.errors as {field: string, message: string}[]
    
            const ststus = error.status as number
                if(ststus === 422) {
                    errors.forEach((error) => {
                        form.setError(error.field as 'email' | 'password', {
                            type: 'server',
                            message: error.message
                        })
                    });
                } else {
                    toast({
                        title: "Lỗi",
                        description: error.payload.message,
                        variant: 'destructive'
                    })
                }
        }
    }

    return (
        <div className="">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, (error) => {
                    console.log("onInValid Chạy nêu Form lỗi")

                })} className="space-y-2 w-full flex-shrink max-w-[600px]">
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

                    <Button onClick={() => onSubmit} className="!mt-8 w-full" type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default LoginForm