import { cookies } from 'next/headers'
import envConfig from "@/config"
import Profile from './profile'

export default async function MeProfile() {

    const cookieStore = cookies()
    const sessionToken = cookieStore.get('sessionToken')
    // console.log(seesionToken)

    const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionToken?.value}`
            // 'Cookie': `sessionToken=${sessionToken}`
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

    //console.log(result)

    return (
        <div>
            <h1>Xin chào {result.payload.data.name}</h1>
            <Profile />
        </div>
    )

}