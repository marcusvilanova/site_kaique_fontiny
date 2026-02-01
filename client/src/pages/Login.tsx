import { getLoginUrl } from "@/const";
import { motion } from "framer-motion";

export default function Login() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 rounded-2xl bg-card border border-border text-center"
            >
                <h1 className="text-3xl font-bold mb-2">Login</h1>
                <p className="text-muted-foreground mb-8">Access the admin dashboard</p>

                <a
                    href={getLoginUrl()}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                    Sign in with Google
                </a>
            </motion.div>
        </div>
    );
}
