import { useState, useEffect } from 'react';
import {
    Users,
    Home,
    DollarSign,
    TrendingUp,
    CheckCircle,
    XCircle,
    Shield,
    Sparkles,
    Eye,
    Trash2,
    Ban,
    UserCheck,
    Search,
    Filter,
    Download,
    Calendar,
    AlertTriangle,
    BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';

interface AdminDashboardProps {
    onBackToApp: () => void;
}

export function AdminDashboard({ onBackToApp }: AdminDashboardProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showUserModal, setShowUserModal] = useState(false);

    // Manual Upgrade State
    const [manualUpgradeEmail, setManualUpgradeEmail] = useState("");
    const [manualUpgradePlan, setManualUpgradePlan] = useState("free");
    const [loading, setLoading] = useState(false); // Added loading state

    // Placeholder functions for API calls
    // Real data fetching
    const fetchStats = async () => {
        try {
            const { data } = await axios.get('/api/admin/stats');
            if (data.stats) {
                setStats(prev => ({
                    ...prev,
                    totalUsers: data.stats.users || 0,
                    activeListings: data.stats.listings || 0,
                    // matches: data.stats.matches
                }));
            }
        } catch (error) {
            console.error("Failed to fetch stats", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const { data } = await axios.get('/api/admin/users');
            setUsers(data.users);
        } catch (error) {
            console.error("Failed to fetch users", error);
        }
    };

    const fetchListings = async () => {
        try {
            // Using the public listings API for now, but in a real app would use an admin specific one
            const { data } = await axios.get('/api/roommates');
            setListings(data.listings || []);
        } catch (error) {
            console.error("Failed to fetch listings", error);
        }
    };

    useEffect(() => {
        fetchStats();
        fetchUsers();
        fetchListings();
    }, []);

    const handleManualUpgrade = async () => {
        if (!manualUpgradeEmail) {
            toast.error("Please enter a user email");
            return;
        }

        setLoading(true);
        try {
            // Mock API call for demonstration
            // In a real application, replace with actual API endpoint
            await axios.post("/api/admin/users/upgrade", {
                email: manualUpgradeEmail,
                plan: manualUpgradePlan
            });
            toast.success(`Successfully upgraded ${manualUpgradeEmail} to ${manualUpgradePlan}`);
            setManualUpgradeEmail("");
            fetchUsers(); // Refresh user list to show changes
        } catch (error) {
            console.error("Failed to upgrade user", error);
            toast.error("Failed to upgrade user");
        } finally {
            setLoading(false);
        }
    };
    // Mock data for admin dashboard
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeListings: 0,
        pendingVerifications: 0,
        totalRevenue: '₹0',
        newUsersToday: 0,
        reportsToday: 0,
    });

    const [users, setUsers] = useState<any[]>([]);
    const [verificationRequests, setVerificationRequests] = useState<any[]>([]);
    const [listings, setListings] = useState<any[]>([]);

    // Mock data for UI placeholders if needed, but we are using state now.
    /*
    const stats = { ... } 
    */

    /*
    const users = [ ... ];
    const listings = [ ... ];
    */

    /*
    const verificationRequests = [ ... ];
    */

    const payments = [
        {
            id: 1,
            userName: 'Priya Sharma',
            plan: 'Premium',
            amount: '₹199',
            date: '15 Jan 2026',
            status: 'completed',
            paymentMethod: 'UPI',
        },
        {
            id: 2,
            userName: 'Rahul Verma',
            plan: 'VIP',
            amount: '₹499',
            date: '14 Jan 2026',
            status: 'completed',
            paymentMethod: 'Credit Card',
        },
        {
            id: 3,
            userName: 'Arjun Mehta',
            plan: 'Basic',
            amount: '₹99',
            date: '13 Jan 2026',
            status: 'failed',
            paymentMethod: 'Debit Card',
        },
    ];

    const reports = [
        {
            id: 1,
            reportedBy: 'User #4523',
            reportedUser: 'Ananya Joshi',
            reason: 'Fake profile',
            date: '10 Feb 2026',
            status: 'pending',
            severity: 'high',
        },
        {
            id: 2,
            reportedBy: 'User #3421',
            reportedUser: 'Rahul Verma',
            reason: 'Inappropriate behavior',
            date: '09 Feb 2026',
            status: 'resolved',
            severity: 'medium',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            {/* Admin Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-xl">
                                <Shield className="size-6 text-white" />
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold text-lg">
                                    Admin Dashboard
                                </h1>
                                <p className="text-sm text-slate-500">RoomieVibes Control Panel</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                Admin Access
                            </Badge>
                            <Button
                                variant="outline"
                                className="border-purple-200"
                                onClick={onBackToApp}
                            >
                                Back to App
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    {/* Tabs Navigation */}
                    <TabsList className="bg-white/80 backdrop-blur-sm p-1 h-auto rounded-2xl shadow-lg border border-purple-100 flex-wrap">
                        <TabsTrigger
                            value="overview"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <BarChart3 className="size-4" />
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="users"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <Users className="size-4" />
                            Users
                        </TabsTrigger>
                        <TabsTrigger
                            value="listings"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <Home className="size-4" />
                            Listings
                        </TabsTrigger>
                        <TabsTrigger
                            value="verifications"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <CheckCircle className="size-4" />
                            Verifications
                        </TabsTrigger>
                        <TabsTrigger
                            value="payments"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <DollarSign className="size-4" />
                            Payments
                        </TabsTrigger>
                        <TabsTrigger
                            value="reports"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <AlertTriangle className="size-4" />
                            Reports
                        </TabsTrigger>
                        <TabsTrigger
                            value="settings"
                            className="gap-2 px-4 py-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white"
                        >
                            <DollarSign className="size-4" />
                            Settings
                        </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Total Users</CardTitle>
                                    <Users className="size-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">{stats.totalUsers.toLocaleString()}</div>
                                    <p className="text-xs text-green-600 flex items-center gap-1">
                                        <TrendingUp className="size-3" />
                                        +{stats.newUsersToday} today
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Active Listings</CardTitle>
                                    <Home className="size-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">{stats.activeListings.toLocaleString()}</div>
                                    <p className="text-xs text-slate-500">
                                        Across all categories
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Total Revenue</CardTitle>
                                    <DollarSign className="size-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">{stats.totalRevenue}</div>
                                    <p className="text-xs text-slate-500">
                                        This month
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-orange-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Pending Verifications</CardTitle>
                                    <AlertTriangle className="size-4 text-orange-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">{stats.pendingVerifications}</div>
                                    <p className="text-xs text-orange-600">
                                        Needs attention
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-red-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Reports Today</CardTitle>
                                    <AlertTriangle className="size-4 text-red-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">{stats.reportsToday}</div>
                                    <p className="text-xs text-red-600">
                                        Requires review
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm">Platform Health</CardTitle>
                                    <Sparkles className="size-4 text-purple-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl mb-1">98.5%</div>
                                    <p className="text-xs text-green-600">
                                        All systems operational
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                                        <div className="bg-purple-100 p-2 rounded-full">
                                            <UserCheck className="size-4 text-purple-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">New user registered: <strong>Priya Sharma</strong></p>
                                            <p className="text-xs text-slate-500">2 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                        <div className="bg-green-100 p-2 rounded-full">
                                            <DollarSign className="size-4 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">Payment received: <strong>₹199</strong> from Rahul Verma</p>
                                            <p className="text-xs text-slate-500">15 minutes ago</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                                        <div className="bg-orange-100 p-2 rounded-full">
                                            <AlertTriangle className="size-4 text-orange-600" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm">New report submitted for user verification</p>
                                            <p className="text-xs text-slate-500">1 hour ago</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Users Tab */}
                    <TabsContent value="users" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>User Management</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="gap-2 border-purple-200">
                                            <Download className="size-4" />
                                            Export
                                        </Button>
                                        <Button variant="outline" className="gap-2 border-purple-200">
                                            <Filter className="size-4" />
                                            Filter
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
                                        <Input
                                            placeholder="Search users by name, email, or phone..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 border-purple-200"
                                        />
                                    </div>
                                    <Select defaultValue="all">
                                        <SelectTrigger className="w-[150px] border-purple-200">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                            <SelectItem value="verified">Verified</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Joined</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Listings</TableHead>
                                            <TableHead>Last Active</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                                                        <div>
                                                            <p className="flex items-center gap-1">
                                                                {user.name}
                                                                {user.verified && (
                                                                    <CheckCircle className="size-3 text-green-500" />
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        <p>{user.email}</p>
                                                        <p className="text-slate-500">{user.phone}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            'bg-green-100 text-green-700 border-green-200'
                                                        }
                                                    >
                                                        {user.role}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{user.listingsCount || 0}</TableCell>
                                                <TableCell className="text-slate-500">{"-"}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedUser(user);
                                                                setShowUserModal(true);
                                                            }}
                                                        >
                                                            <Eye className="size-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            {user.status === 'active' ? (
                                                                <Ban className="size-4 text-red-500" />
                                                            ) : (
                                                                <UserCheck className="size-4 text-green-500" />
                                                            )}
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="size-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Listings Tab */}
                    <TabsContent value="listings" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Listings Management</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[150px] border-purple-200">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Listings</SelectItem>
                                                <SelectItem value="roommate">Roommates</SelectItem>
                                                <SelectItem value="room">Rooms</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[150px] border-purple-200">
                                                <SelectValue placeholder="Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Status</SelectItem>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="expired">Expired</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Listing</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Budget</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Stats</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {listings.map((listing) => (
                                            <TableRow key={listing.id}>
                                                <TableCell>
                                                    <div>
                                                        <p className="flex items-center gap-1">
                                                            {listing.title}
                                                            {listing.verified && (
                                                                <CheckCircle className="size-3 text-green-500" />
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-slate-500">{new Date(listing.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                                        {listing.type}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{listing.location}</TableCell>
                                                <TableCell>{listing.budget}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className='bg-green-100 text-green-700 border-green-200'
                                                    >
                                                        Active
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-xs text-slate-500">
                                                        <p>{listing.views} views</p>
                                                        <p>{listing.contacts} contacts</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="size-4" />
                                                        </Button>
                                                        {listing.status === 'pending' && (
                                                            <>
                                                                <Button variant="ghost" size="sm">
                                                                    <CheckCircle className="size-4 text-green-500" />
                                                                </Button>
                                                                <Button variant="ghost" size="sm">
                                                                    <XCircle className="size-4 text-red-500" />
                                                                </Button>
                                                            </>
                                                        )}
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="size-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Verifications Tab */}
                    <TabsContent value="verifications" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>Verification Requests ({verificationRequests.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Document Type</TableHead>
                                            <TableHead>Submitted Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {verificationRequests.map((request) => (
                                            <TableRow key={request.id}>
                                                <TableCell>
                                                    <div>
                                                        <p>{request.name}</p>
                                                        <p className="text-xs text-slate-500">{request.email}</p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{request.documentType || "ID Proof"}</TableCell>
                                                <TableCell>{new Date(request.submittedDate).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                                                        {request.verificationStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="size-4" />
                                                        </Button>
                                                        <Button
                                                            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                                                            size="sm"
                                                        >
                                                            <CheckCircle className="size-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            className="border-red-200 text-red-600 hover:bg-red-50"
                                                            size="sm"
                                                        >
                                                            <XCircle className="size-4 mr-1" />
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Payments Tab */}
                    <TabsContent value="payments" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>Payment History</CardTitle>
                                    <Button variant="outline" className="gap-2 border-purple-200">
                                        <Download className="size-4" />
                                        Export Report
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User</TableHead>
                                            <TableHead>Plan</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {payments.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>{payment.userName}</TableCell>
                                                <TableCell>
                                                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                                                        {payment.plan}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-green-600">{payment.amount}</TableCell>
                                                <TableCell>{payment.date}</TableCell>
                                                <TableCell>{payment.paymentMethod}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            payment.status === 'completed'
                                                                ? 'bg-green-100 text-green-700 border-green-200'
                                                                : 'bg-red-100 text-red-700 border-red-200'
                                                        }
                                                    >
                                                        {payment.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">
                                                        <Eye className="size-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Reports Tab */}
                    <TabsContent value="reports" className="space-y-6">
                        <Card className="bg-white/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle>User Reports ({reports.length} pending)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Report Table Placeholder */}
                                <div className="text-center py-10 text-gray-500">Reports list coming soon...</div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Settings Tab */}
                    <TabsContent value="settings" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Payment Gateways */}
                            <Card className="bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Payment Gateways</CardTitle>
                                    <CardDescription>Configure API keys for Stripe and Razorpay.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm">Stripe</h3>
                                        <Input placeholder="Stripe Publishable Key" />
                                        <Input type="password" placeholder="Stripe Secret Key" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm">Razorpay</h3>
                                        <Input placeholder="Razorpay Key ID" />
                                        <Input type="password" placeholder="Razorpay Key Secret" />
                                    </div>
                                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Save Keys</Button>
                                </CardContent>
                            </Card>

                            {/* Plan Configuration (Manual) */}
                            <Card className="bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle>Manual Plan Activation</CardTitle>
                                    <CardDescription>
                                        Enter the user's email address and select a plan to manually upgrade their subscription.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm">Target User Email</h3>
                                        <Input
                                            placeholder="user@example.com"
                                            value={manualUpgradeEmail}
                                            onChange={(e) => setManualUpgradeEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-sm">Select Plan</h3>
                                        <Select value={manualUpgradePlan} onValueChange={setManualUpgradePlan}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Plan" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="free">Free (1 Post/mo)</SelectItem>
                                                <SelectItem value="premium">Premium (₹99 - 3 Posts, 1 Featured)</SelectItem>
                                                <SelectItem value="vip">VIP (₹599 - Direct Contact)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
                                        onClick={handleManualUpgrade}
                                        disabled={loading}
                                    >
                                        {loading ? "Activating..." : "Activate Plan"}
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* User Detail Modal */}
            < Dialog open={showUserModal} onOpenChange={setShowUserModal} >
                <DialogContent className="max-w-2xl bg-gradient-to-br from-purple-50 via-white to-pink-50">
                    <DialogHeader>
                        <DialogTitle className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            User Details
                        </DialogTitle>
                        <DialogDescription>
                            View and manage user information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedUser && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="size-16 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
                                <div>
                                    <h4 className="flex items-center gap-2">
                                        {selectedUser.name}
                                        {selectedUser.verified && (
                                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                                Verified
                                            </Badge>
                                        )}
                                    </h4>
                                    <p className="text-slate-500">{selectedUser.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-lg">
                                <div>
                                    <p className="text-sm text-slate-500">Phone</p>
                                    <p>{selectedUser.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Joined</p>
                                    <p>{selectedUser.joinedDate}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Listings</p>
                                    <p>{selectedUser.listingsCount} active</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Last Active</p>
                                    <p>{selectedUser.lastActive}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="flex gap-2">
                        <Button variant="outline" onClick={() => setShowUserModal(false)}>
                            Close
                        </Button>
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                            Edit User
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

