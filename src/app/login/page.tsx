'use client'
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"
import { useSetCookie } from 'cookies-next';
import { ConvexError } from "convex/values";

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const setCookie = useSetCookie();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = await login({ username, password });
            setCookie('token', data.token);
            router.push("/");
        } catch (err) {
            if (err instanceof ConvexError && err.message.toLowerCase().includes("password")) {
                toast.error("Wrong password");
            } else if(err instanceof ConvexError && err.message.toLowerCase().includes("username")) {
                toast.error("Wrong username");
            } else {
                toast.error("Login failed");
        }
    }
    };
    const login = useMutation(api.server.login);
    const router = useRouter();



    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-gray-400 dark:bg-gray-700 w-fit p-12 rounded-3xl text-white text-lg min-w-[400px]">
                <h2 className="text-3xl mb-6 font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <label className="flex flex-col text-lg">
                        <span className="mb-1">Username:</span>
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={e => setUsername(e.target.value)}
                            className="p-2 rounded text-gray-300 mt-1 border-2 border-gray-400 focus:border-blue-500 text-lg w-full min-w-[350px]"
                            required
                        />
                    </label>
                    <label className="flex flex-col text-lg">
                        <span className="mb-1">Password:</span>
                        <input
                            type="password"
                            value={password}
                            placeholder="Enter password"
                            onChange={e => setPassword(e.target.value)}
                            className="p-2 rounded text-gray-300 mt-1 border-2 border-gray-400 focus:border-blue-500 text-lg w-full min-w-[350px]"
                            required
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded text-lg font-semibold w-full min-w-[350px]">Login</button>
                </form>
                <div className="mt-4 text-center">
                    <Link href="/register" className="text-sm text-blue-300 hover:underline">Don`t have an account? Register</Link>
                </div>
            </div>
        </div>
    );
}
