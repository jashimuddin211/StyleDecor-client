import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <div className="w-64 bg-base-200 p-5 space-y-3">

                <h2 className="text-xl font-bold mb-5">
                    User Dashboard
                </h2>

                <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/my-profile">
                    My Profile
                </Link>

                <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/my-bookings">
                    My Bookings
                </Link>

                <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/cancel-booking">
                    Cancel Booking
                </Link>

                <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/payment-history">
                    Payment History
                </Link>

            </div>

            {/* CONTENT */}
            <div className="flex-1 p-6">
                <Outlet />
            </div>

        </div>
    );
};

export default DashboardLayout;