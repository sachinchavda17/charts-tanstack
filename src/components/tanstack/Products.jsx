"use client";

import { createProduct, getProducts } from "@/api/products";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";

export default function Products() {
  const query = useQuery({
    queryKey: ["posts"], // works like useState
    queryFn: getProducts, // works like useEffect
  });

  // 🛠️ Mutation for Adding a Product // not workable
  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]); // Refresh data
    },
  });

  if (query.isLoading)
    return (
      <div className="flex justify-center items-center h-32 w-full">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (query.isError)
    return (
      <div className="text-red-700">
        Error : {query.isError ? query.error.message : "Something went wrong!!"}
      </div>
    );
    
  return (
    <Card className="p-6 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Featured Products
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {query?.data?.map((item) => (
          <Card
            key={item.id}
            className=" bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardContent className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-xl mb-4 shadow-sm"
              />
              <div className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.name}
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                company : {item.company}
              </div>
              <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                Price : ${item.price}
              </div>
              <div className="mt-1 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                Category : {item.category}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
      <CardFooter>
        <div className="flex gap-4">
          <Button
            className="p-2"
            onClick={() =>
              createMutation.mutate({ name: "New Product", price: 100 })
            }
          >
            Add Product
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
