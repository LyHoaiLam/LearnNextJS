'use client'
import { useRouter } from "next/navigation";

export default function ButtonRedirect() {
      
  const router = useRouter()
  
  const handlerNavigate = () => {
    router.push('/login')
  }


    return (
        <div>
            <button
                onClick={handlerNavigate}
                    >Chuyển sang Page Logn bằng useRouter ButtonRedirect
            </button>
        </div>
    )
}