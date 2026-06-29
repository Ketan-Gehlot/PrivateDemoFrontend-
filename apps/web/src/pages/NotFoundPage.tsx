import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => (
  <main className="grid min-h-screen place-items-center p-6 text-center">
    <div>
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
      <Button className="mt-6" asChild>
        <Link to="/dashboard">Go to dashboard</Link>
      </Button>
    </div>
  </main>
);

export default NotFoundPage;
