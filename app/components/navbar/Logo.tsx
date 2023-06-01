'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image onClick={() => router.push("/")} src={"/images/logo.png"} height={100} width={100} alt="logo" className="md:block hidden cursor-pointer" />
    )
}

export default Logo;