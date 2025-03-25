"use client"

import { useRouter } from "next/navigation";

export default async function Home() {
    const router = useRouter();
    router.push('/dashboard');
    return (<></>);
    return (
        <div>
            <img src="https://cdn.bealy.io/icons/bealyFavicon512.png" alt="Logo" width={50} height={50} />
        </div>
    );
}
