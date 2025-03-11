import Link from "next/link";

export default function Navigation() {
    return (
        <nav>
            <Link href="/">Main</Link>
            <Link href="/user-profile">User profile</Link>
            <Link href="/favorite-stories">Favorite stories</Link>
            <Link href="/login">Login</Link>
        </nav>
    );
}