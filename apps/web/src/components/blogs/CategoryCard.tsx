import Link from "next/link";
import { Folder, FolderTree, FileText } from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import type { CategoryResponse } from "@workspace/contracts/content";

const CategoryCard = ({ category }: { category: CategoryResponse }) => {
  return (
    <Link href={`/blogs/category/${category.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Folder className="h-5 w-5" />
            {category.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {category.description || "Explore articles in this category"}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {category._count?.posts} posts
              </Badge>
              {category.children && category.children.length > 0 && (
                <Badge variant="outline" className="gap-1">
                  <FolderTree className="h-3 w-3" />
                  {category.children.length} subcategories
                </Badge>
              )}
            </div>
            <span className="text-sm text-primary group-hover:underline">
              Browse →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
