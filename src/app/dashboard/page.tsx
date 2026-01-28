"use client";
import ChartAreaInteractive from "@components/dashboard/chart-area-interactive";
import RecentPosts from "@components/dashboard/RecentPosts";
import DashboardCards from "@components/dashboard/dashboard-cards";
import useDashboard from "@hooks/dashboard";
import ContentOverview from "@components/dashboard/ContentOverview";
import DashboardSkeleton from "@components/skeleton/DashboardSke1eton";

const Dashboard = () => {
  const { data, isLoading } = useDashboard();

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCards data={data.cards} />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive data={data.visitors} />
          </div>

          <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 lg:grid-cols-2">
            <RecentPosts data={data.recentPosts} />
            <ContentOverview data={data.contentOverview} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
