"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user || user.role !== 'admin') {
            router.push("/");
            return;
        }

        fetchUsers();
    }, [user, authLoading, router]);

    const fetchUsers = () => {
        axios.get("/api/admin/users")
            .then(({ data }) => {
                setUsers(data.users);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    };

    const deleteUser = async (id: number) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;

        try {
            await axios.delete(`/api/admin/users/${id}`);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (error) {
            console.error("Failed to delete user", error);
            alert("Failed to delete user");
        }
    };

    if (loading || authLoading) return <div className="p-10 text-center">Loading Users...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">User Management</h1>

            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
                    <thead className="bg-gray-50 dark:bg-zinc-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{u.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {u.id !== user?.id && (
                                        <button onClick={() => deleteUser(u.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
