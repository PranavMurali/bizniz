import { logout } from "@/actions/auth";


export function LogoutButton() {
    return (
        <div>
            <button onClick={logout}>Sign Out</button>
        </div>
    )
}