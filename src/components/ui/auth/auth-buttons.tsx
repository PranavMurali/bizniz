import { login, logout } from "@/actions/auth";

export function LoginButton() {
    return (
        <div>
            <button onClick={login}>Sign In</button>
        </div>
    )
}

export function LogoutButton(){
    return (
        <div>
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}