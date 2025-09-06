import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Loading from "../Utility/Loading";

const ProductsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [collegeQuery, setCollegeQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const collegeOptions = [
    "All",
    "IIIT K",
    "IIIT A",
    "IIIT B",
    "IIIT C",
    "IIIT D",
    "IIIT E",
    "IIIT F",
    "IIIT G",
    "IIIT H",
    "NIT A",
    "NIT B",
    "NIT C",
    "NIT D",
    "NIT E",
    "NIT F",
  ];

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle college query change
  const handleCollegeQueryChange = (e) => {
    setCollegeQuery(e.target.value);
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Handle price range change
  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
  };

  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/products/");
      if (response.ok) {
        const products = await response.json();

        // Filter products based on the search query, price range, and category
        const filtered = products
          .filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .filter((product) =>
            product.uploadedBy.college
              .toLowerCase()
              .includes(collegeQuery.toLowerCase())
          )
          .filter(
            (product) =>
              product.price.$numberDecimal >= priceRange[0] &&
              product.price.$numberDecimal <= priceRange[1]
          )
          .filter((product) =>
            product.category
              .toLowerCase()
              .includes(categoryFilter.toLowerCase())
          )
          .filter((product) => {
            if (searchQuery.trim() === "") {
              return true; // If search query is empty, include all products
            }
            // Use a case-insensitive regex to match the search query against product name or description
            const regex = new RegExp(searchQuery, "i");
            return regex.test(product.name) || regex.test(product.description);
          })
          .sort((a, b) => {
            if (sortBy === "lowestPrice") {
              return (
                parseFloat(a.price.$numberDecimal) -
                parseFloat(b.price.$numberDecimal)
              );
            } else if (sortBy === "highestPrice") {
              return (
                parseFloat(b.price.$numberDecimal) -
                parseFloat(a.price.$numberDecimal)
              );
            } else if (sortBy === "latest") {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
            return 0;
          });

        setFilteredProducts(filtered);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const productsPerPage = 20;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="lg:w-4/5 mx-4 md:mx-auto py-4">
      <h1 className="text-3xl font-semibold mb-4">All Products</h1>
      <div>
        {!isLoading ? (
          <div className="flex">
            <Filters
              searchQuery={searchQuery}
              handleSearchQueryChange={handleSearchQueryChange}
              collegeQuery={collegeQuery}
              handleCollegeQueryChange={handleCollegeQueryChange}
              collegeOptions={collegeOptions}
              sortBy={sortBy}
              handleSortChange={handleSortChange}
              priceRange={priceRange}
              handlePriceRangeChange={handlePriceRangeChange}
              categoryFilter={categoryFilter}
              handleCategoryFilterChange={handleCategoryFilterChange}
              handleFiltersApplied={fetchProducts}
            />
            <div className="w-full flex flex-col items-center">
              <ProductList currentProducts={currentProducts} />
              <Pagination
                filteredProducts={filteredProducts}
                productsPerPage={productsPerPage}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default ProductsList;
