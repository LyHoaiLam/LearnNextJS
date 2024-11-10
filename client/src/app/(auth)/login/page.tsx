import LoginFrom from "./login-form"

export default function LoginPage() {
    return (

        <>
            <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>
                <div className="flex justify-center">
                    <LoginFrom />
                </div>
        </>
    )
}