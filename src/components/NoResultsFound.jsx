import React from "react";
import { SearchX, RefreshCw, Home } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/searchReducer";
import { Link } from "react-router-dom";

const NoResultsFound = () => {
  const searchQuery = useSelector((state) => state.searchQuery);
  const dispatch = useDispatch();

  return (
    <div className="w-full col-span-full max-w-6xl mx-auto bg-gray-100 rounded-lg  p-8 md:p-12 shadow-2xl">
      <div className="flex flex-col items-center">
        <div className="bg-indigo-50 p-6 rounded-full mb-8">
          <SearchX className="h-20 w-20 text-indigo-500" />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          No results found for "wireless headphones"
        </h2>

        <p className="text-gray-600 mb-10 text-center text-lg max-w-2xl">
          We couldn't find any products matching your search. Try different
          keywords or browse our categories.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-12">
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center cursor-pointer"
            onClick={() => dispatch(setSearchQuery(""))}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Clear Search
          </button>

          <Link to={"/"}>
            {" "}
            <button
              className="border cursor-pointer border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
              onClick={() => dispatch(setSearchQuery(""))}
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Homepage
            </button>
          </Link>
        </div>

        <div className="w-full bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="font-medium text-gray-800 mb-4 text-center text-lg">
            Popular searches
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Headphones",
              "Laptops",
              "Smartphones",
              "Cameras",
              "Accessories",
              "Speakers",
              "Tablets",
              "Smartwatches",
            ].map((term) => (
              <button
                key={term}
                className="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 rounded-full border border-gray-200 transition duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoResultsFound;
