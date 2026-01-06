export default function ProblemShimmer(){
    return(
        <div className="w-full p-4 overflow-y-auto backdrop-blur-md bg-black/50 rounded-2xl">
        <div className="w-[95%] container mx-auto pt-3">
          <div className="animate-pulse">
            {/* Title shimmer */}
            <div className="h-8 w-48 bg-linear-to-r from-gray-100 via-gray-500 to-gray-800 rounded-lg mb-6"></div>

            {/* Description shimmer */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-full bg-linear-to-r from-white via-gray-700 to-gray-800 rounded"></div>
              <div className="h-4 w-5/6 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded"></div>
              <div className="h-4 w-3/4 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded"></div>
            </div>

            {/* Example section shimmer */}
            <div className="bg-[rgba(40,0,65,0.45)] border border-white/10 rounded-xl p-4">
              <div className="h-5 w-24 bg-linear-to-r from-purple-300 via-purple-700 to-purple-900 rounded mb-4"></div>

              {/* Example cards shimmer */}
              <div className="space-y-4">
                <div className="border border-white/10 rounded-xl p-3 bg-black/40">
                  <div className="h-3 w-3/4 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded mb-2"></div>
                  <div className="h-3 w-2/3 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded mb-2"></div>
                  <div className="h-3 w-5/6 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded"></div>
                </div>

                <div className="border border-white/10 rounded-xl p-3 bg-black/40">
                  <div className="h-3 w-3/4 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded mb-2"></div>
                  <div className="h-3 w-2/3 bg-linear-to-r from-gray-800 via-gray-700 to-gray-800 rounded mb-2"></div>
                  <div className="h-3 w-5/6 bg-linear-to-r from-purple-500 via-purple-700 to-purple-900 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}