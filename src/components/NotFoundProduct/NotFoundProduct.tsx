import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFoundProduct({directedPath,browse}) {


  return (
    
    <div className="flex min-h-[60vh] items-center justify-center px-4 shadow-2xl relative w-full mx-auto">
      <div className="text-center space-y-6">
        
        {/* Icon */}
        <div className="flex justify-center">
          <SearchX className="w-16 h-16 text-gray-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Product Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 max-w-md mx-auto">
          Sorry, we couldn't find the product you're looking for.
          It may have been removed or does not exist.
        </p>

        {/* Button */}
        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition"
          >
            Go Home
          </Link>

          <Link
            href={directedPath}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Browse {browse}
          </Link>
        </div>

      </div>
    </div>
  );
}
