"use client";

import Link from "next/link";

export default function RestaurantLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-admin-bg p-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4 no-underline">
            <div className="w-9 h-9 rounded-[9px] bg-admin-dark text-white flex items-center justify-center font-bold text-[18px]">
              D
            </div>
            <span className="font-semibold text-[17px] text-admin-text">DietaryID</span>
          </Link>
          <h1 className="text-[24px] font-semibold text-admin-text mb-1">DietaryID for Restaurants</h1>
          <p className="text-[14px] text-admin-muted">Reach allergy-conscious customers &amp; grow your business</p>
        </div>

        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/restaurant/dashboard";
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-[13px] font-medium text-admin-text mb-1.5">Email</label>
              <input
                type="email"
                placeholder="restaurant@example.com"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] text-admin-text outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-admin-text mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-admin-border rounded-md text-[14px] text-admin-text outline-none focus:ring-2 focus:ring-admin-new-bg bg-admin-bg"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[13px] text-admin-nav-text">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-[13px] text-admin-new-text no-underline hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-md bg-admin-dark text-white font-semibold text-[14px] hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-admin-border text-center">
            <p className="text-[13px] text-admin-muted">
              New restaurant?{" "}
              <Link href="/restaurant-signup" className="text-admin-new-text no-underline hover:underline font-medium">
                Create your account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-admin-muted mt-6">
          Already have an admin account?{" "}
          <Link href="/admin/analytics" className="text-admin-new-text no-underline hover:underline">
            Go to admin
          </Link>
        </p>
      </div>
    </div>
  );
}
