import { Button } from "@components/ui/button";

const Newsletter = () => {
  return (
    <section>
      <div className="py-16 bg-linear-to-r from-primary/10 to-primary/5 mb-8 rounded-2xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Post</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest articles delivered
            directly to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
