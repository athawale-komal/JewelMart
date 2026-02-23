import { Home, Search, ArrowLeft, Gem } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-150 via-amber-200 to-slate-250 flex items-center justify-center p-4 ">
      <div className="max-w-2xl w-full ">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-amber-400 to-amber-600 rounded-full mb-4 shadow-lg">
            <Gem className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 ">JewelMart</h1>
        </div>

        {/* Error Content */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* 404 Number */}
          <div className="relative mb-6">
            <h2 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 leading-none">
              404
            </h2>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>

          {/* Error Message */}
          <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Page Not Found
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            Oops! The precious gem you're looking for seems to have vanished.
            The page you requested doesn't exist in our collection.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Home className="w-5 h-5" />
              Home Page
            </button>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">
              Looking for something specific?
            </p>
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search jewelry..."
                className="w-full px-4 py-3 pl-12 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`;
                  }
                }}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-slate-500 mt-8">
          Need help? Contact our support team at{' '}
          <a href="mailto:support@jewelmart.com" className="text-amber-600 hover:text-amber-700 font-medium">
            support@jewelmart.com
          </a>
        </p>
      </div>
    </div>
  );
}