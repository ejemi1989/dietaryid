export default function MyHubPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">My hub</h1>
        <p className="text-[14px] text-admin-muted">Your personal admin dashboard.</p>
      </div>
      <div className="px-[26px] py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[900px]">
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Tasks assigned</div>
            <div className="text-[22px] font-semibold text-admin-text mt-1">8</div>
            <div className="text-[12px] text-admin-muted mt-1">3 due today</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Reviews moderated</div>
            <div className="text-[22px] font-semibold text-admin-text mt-1">147</div>
            <div className="text-[12px] text-admin-active-text mt-1">↑ 12 this week</div>
          </div>
          <div className="bg-admin-bg border border-admin-border rounded-[10px] p-5">
            <div className="text-[12px] text-admin-muted">Avg response time</div>
            <div className="text-[22px] font-semibold text-admin-text mt-1">18 min</div>
            <div className="text-[12px] text-admin-active-text mt-1">↓ 4 min vs last week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
