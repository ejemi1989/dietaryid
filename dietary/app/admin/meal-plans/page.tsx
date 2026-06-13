export default function MealPlansPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Meal Plans</h1>
        <p className="text-[14px] text-admin-muted">User meal plans and dietary schedules.</p>
      </div>
      <div className="px-[26px] py-12 text-center">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 max-w-[500px] mx-auto">
          <div className="text-[15px] font-semibold text-admin-text mb-2">1 active plan</div>
          <p className="text-[13.5px] text-admin-muted">
            Meal plan management is coming in a future release.
          </p>
        </div>
      </div>
    </div>
  );
}
