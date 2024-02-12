'use client';
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="h-40 bg-[royalblue] mt-5">
            <div className="flex p-5 justify-around">
                <div className="text-center flex flex-col justify-center">
                    <h1 className="text-3xl">Welcome to work manager</h1>
                    <p>lorem ipsum</p>
                </div>
                <div className="text-center">
                    <h1>Important Links</h1>
                    <ul>
                        <li>
                            <Link href="#">Facebook</Link>
                        </li>
                        <li>
                            <Link href="#">Youtube</Link>
                        </li>
                        <li>
                            <Link href="#">Instagram</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;