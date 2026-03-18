"use client";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";
import type { PostQueryType, PostResponse } from "@workspace/contracts/content";
import { usePosts } from "@/hooks/content";
import BlogCard from "../blogs/BlogCard";

interface BlogSectionProps {
  className?: string;
  posts?: PostResponse[];
  params?: PostQueryType;
}

export function BlogSection({ className, posts, params }: BlogSectionProps) {
  const { data } = usePosts(params);
  if (!posts) posts = data?.posts;

  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <SectionHeader
          subtitle="Blog"
          title="Latest Insights"
          description="Stay updated with the latest in healthcare revenue management"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {posts?.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <BlogCard post={post} />
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button href="/blogs" size="lg" className="group">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
