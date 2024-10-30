import Link from "next/link";
import ButtonRedirect from "./components/ButtonRedirect";
import { redirect } from "next/navigation";

const isAuth = false

export default function Home() {

  if(!isAuth) {
    redirect('/login')
  } else {}

  return (
  <div>
    <main>
      <h1 className="text-4xl text-center noto-sans-display">Home Page NEXTJS</h1>
        <ul>
          <li className="my-1.5 cursor-pointer hover:bg-sky-700 ">
            <Link href={'/login'}>Login</Link>
          </li>
          <li className="my-1.5 cursor-pointer hover:bg-sky-700 ">
            <Link href={'/register'}>Register</Link>
          </li>
        </ul>
        <ButtonRedirect />
    </main>
  </div>
  );
}
