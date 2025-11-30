"use client";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner"

export default function Page() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            await register({ username, password });
            toast.success("Registered successfully!");
            router.push("/login");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Registration failed");
        }
    };
    const register = useMutation(api.server.registerUser);
    const router = useRouter();



    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-gray-400 dark:bg-gray-700 w-fit p-12 rounded-3xl text-white text-lg min-w-[400px]">
                <h2 className="text-3xl mb-6 font-bold text-center">Register</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <label className="flex flex-col text-lg">
                        <span className="mb-1">Username:</span>
                        <input
                            type="text"
                            value={username}
                            placeholder="Enter username"
                            onChange={e => setUsername(e.target.value)}
                            className="p-2 rounded text-gray-300 mt-1 border-2 border-gray-600 dark:border-gray-400 focus:border-blue-500 text-lg w-full min-w-[350px]"
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
                            className="p-2 rounded text-gray-300 mt-1 border-2 border-gray-600 dark:border-gray-400 focus:border-blue-500 text-lg w-full min-w-[350px]"
                            required
                        />
                    </label>
                    <label className="flex flex-col text-lg">
                        <span className="mb-1">Confirm Password:</span>
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            className="p-2 rounded text-gray-300 mt-1 border-2 border-gray-600 dark:border-gray-400 focus:border-blue-500 text-lg w-full min-w-[350px]"
                            required
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded text-lg font-semibold w-full min-w-[350px]">Register</button>
                    <div className="mt-4 text-center">
                        <Link href="/login" className="text-sm text-blue-300 hover:underline">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
