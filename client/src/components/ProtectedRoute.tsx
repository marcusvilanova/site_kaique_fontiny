import { ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "../lib/trpc";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const [location, setLocation] = useLocation();
    const { data: user, isLoading } = trpc.auth.me.useQuery();

    useEffect(() => {
        if (!isLoading && !user) {
            setLocation("/login");
        }
    }, [user, isLoading, setLocation]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
