"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { createUser, getUsers } from "../../../server/users";

export default function Users() {
  const query = useQuery({ queryKey: ["todos"], queryFn: getUsers });
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
  if (query.isLoading)
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  

  return (
    <Card className="mt-5 ">
      <CardHeader>
        <CardTitle className={"text-2xl font-bold text-center "}>
          Users
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-5 gap-5 ">
        {query.data?.map((user) => (
          <Card key={user.id}>
            <CardContent className={"text-center"}>{user.name}</CardContent>
          </Card>
        ))}
      </CardContent>

      <CardFooter>
        <Button
          onClick={() => {
            mutation.mutate({
              id: query.data.length + 1,
              name: "john doe",
            });
          }}
        >
          Add User
        </Button>
      </CardFooter>
    </Card>
  );
}
