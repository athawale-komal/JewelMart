
import React, { useEffect, useState } from "react";
import { Search, UserX, Mail, Phone, Loader2, Shield } from "lucide-react";
import api from "../../config/apiConfig";
import { toast } from "react-toastify";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await api.get("/api/jewelmart/user/users");
            setUsers(response.data.data || response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user? This action is IRREVERSIBLE.")) {
            try {
                await api.delete(`/api/jewelmart/user/delete/${id}`);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (err) {
                toast.error(err.response?.data?.error || "Error deleting user");
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-xl font-bold text-slate-900 mb-0.5">User Directory</h1>
                <p className="text-slate-500 text-sm">Manage access and accounts for all registered users.</p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                                <th className="px-6 py-3.5">User</th>
                                <th className="px-6 py-3.5">Contact</th>
                                <th className="px-6 py-3.5">Role</th>
                                <th className="px-6 py-3.5">Joined</th>
                                <th className="px-6 py-3.5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center">
                                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-sm text-slate-400">No users found.</td>
                                </tr>
                            ) : filteredUsers.map((u) => (
                                <tr key={u._id} className="hover:bg-slate-50/60 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-sm shrink-0">
                                                {u.name?.[0]?.toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-800">{u.name} {u.surname}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">#{u._id?.slice(-6)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Mail size={11} className="text-slate-400" /> {u.email}
                                            </div>
                                            {u.mobile && (
                                                <div className="flex items-center gap-2 text-xs text-slate-600">
                                                    <Phone size={11} className="text-slate-400" /> {u.mobile}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-slate-50 text-slate-500 border border-slate-200'}`}>
                                            {u.role === 'ADMIN' && <Shield size={10} />}
                                            {u.role || 'CUSTOMER'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-xs text-slate-500">{new Date(u.createdAt).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {u.role !== 'ADMIN' && (
                                            <button onClick={() => handleDeleteUser(u._id)} className="p-2 bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-all border border-slate-200 hover:border-rose-200" title="Delete User">
                                                <UserX size={15} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
