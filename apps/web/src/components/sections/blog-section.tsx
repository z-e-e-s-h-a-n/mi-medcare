"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { SectionHeader } from "@/components/layout/section-header";
import type { PostQueryType, PostResponse } from "@workspace/contracts/content";
import { formatDate } from "@workspace/shared/utils";
import { estimateReadTime } from "@/lib/utils";
import { usePosts } from "@/hooks/usePosts";

interface BlogSectionProps {
  className?: string;
  posts?: PostResponse[];
  params?: PostQueryType;
}

export function BlogSection({ className, posts, params }: BlogSectionProps) {
  const { data } = usePosts(params);
  if (!posts) posts = data;

  return (
    <section className={cn("section-wrapper", className)}>
      <div className="section-container">
        <SectionHeader
          badge="Blog"
          title="Latest Insights"
          description="Stay updated with the latest in healthcare revenue management"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/blogs/${post.slug}`}>
                <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/50 to-transparent" />
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={post.cover?.url ?? "/images/blog-placeholder.png"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <span className="absolute left-3 top-3 z-20 rounded-full bg-primary px-3 py-1 text-xs text-white">
                    {post.category.name}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                <p className="mb-4 text-sm text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {estimateReadTime(post.content)}
                  </span>
                </div>
              </Link>
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
