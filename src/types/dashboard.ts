declare global {
  interface DashboardData {
    cards: {
      title: string;
      value: number;
      badge: { value: string; trend: "up" | "down" };
      footer: { title: string; description: string };
    }[];
    visitors: {
      date: string;
      views: number;
    }[];
    recentPosts: Array<{
      id: string;
      title: string;
      slug: string;
      status: PostStatusType;
      views: number;
      createdAt: Date;
      author: { displayName: string };
      category: { name: string } | null;
    }>;
    contentOverview: {
      categories: Array<{
        id: string;
        name: string;
        postCount: number;
      }>;
      tags: Array<{
        id: string;
        name: string;
        postCount: number;
      }>;
    };
  }
}

export {};
