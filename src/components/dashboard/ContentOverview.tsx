"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@components/ui/tabs";
import { Progress } from "@components/ui/progress";
import { Badge } from "@components/ui/badge";

interface ContentOverviewProps {
  data: DashboardData["contentOverview"];
}

const ContentOverview = ({ data }: ContentOverviewProps) => {
  const maxCategoryCount = Math.max(
    ...data.categories.map((c) => c.postCount),
    1,
  );
  const maxTagCount = Math.max(...data.tags.map((t) => t.postCount), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Overview</CardTitle>
        <CardDescription>
          Stats about your content by category and tag
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="w-full">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <h4 className="font-semibold mb-4">Top Categories</h4>
            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {data.categories.map((c) => {
                const percentage = Math.round(
                  (c.postCount / maxCategoryCount) * 100,
                );
                return (
                  <div key={c.id} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{c.name}</span>
                      <Badge variant="secondary">{c.postCount} posts</Badge>
                    </div>
                    <Progress value={percentage} className="h-2 rounded-lg" />
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Tags Tab */}
          <TabsContent value="tags">
            <h4 className="font-semibold mb-4">Popular Tags</h4>
            <div className="flex flex-wrap gap-3 max-h-[452px] overflow-y-auto">
              {data.tags.map((t) => {
                const percentage = Math.round(
                  (t.postCount / maxTagCount) * 100,
                );
                return (
                  <div
                    key={t.id}
                    className="flex flex-col w-[calc(50%-0.5rem)]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">#{t.name}</span>
                      <Badge variant="outline">{t.postCount} Posts</Badge>
                    </div>
                    <Progress value={percentage} className="h-2 rounded-lg" />
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentOverview;
