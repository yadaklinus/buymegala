import { AlertTriangle } from "lucide-react";
import Link from "next/link";



export default function NotFoundPage() {
   
    return (
        <div className="text-center py-16 px-4 bg-black/50 backdrop-blur-lg border border-yellow-500/20 rounded-xl shadow-2xl max-w-2xl mx-auto">
            <AlertTriangle className="mx-auto h-24 w-24 text-yellow-400" />
            <h1 className="mt-8 text-6xl font-extrabold text-gray-100">404</h1>
            <h2 className="mt-2 text-3xl font-bold text-gray-200">Page Not Found</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-md mx-auto">
                Oops! The page you're looking for seems to have gotten lost.
            </p>
            <div className="mt-8">
                <Link
                    href={"/"}
                    className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-400 transition duration-300"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}