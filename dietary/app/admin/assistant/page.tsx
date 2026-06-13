export default function AssistantPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-[26px] py-6 border-b border-admin-border">
        <h1 className="text-[24px] font-semibold text-admin-text mb-1">Assistant</h1>
        <p className="text-[14px] text-admin-muted">AI-powered admin assistant (coming soon).</p>
      </div>
      <div className="px-[26px] py-12 text-center">
        <div className="bg-admin-bg border border-admin-border rounded-[10px] p-12 max-w-[500px] mx-auto">
          <div className="text-[15px] font-semibold text-admin-text mb-2">Coming soon</div>
          <p className="text-[13.5px] text-admin-muted">
            The admin assistant will help with quick queries, draft responses, and surface trends.
          </p>
        </div>
      </div>
    </div>
  );
}
