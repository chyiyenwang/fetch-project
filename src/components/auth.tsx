'use client';

import { Button, Input } from "@heroui/react";
import { login } from "@/actions";
import { useActionState } from "react";

export default function Auth() {
  const [ formState, action, isLoading ] = useActionState(login, {
    errors: {},
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <form action={action} className="w-[300px] flex flex-col justify-center items-center gap-4">
        <Input
          name="name"
          label="Name"
          labelPlacement="outside"
          isInvalid={!!formState?.errors.name}
          errorMessage={formState?.errors.name?.map((error, id) => {
            return <div key={error + id}>{error}</div>;
          })}
        />
        <Input
          name="email"
          label="Email"
          labelPlacement="outside"
          isInvalid={!!formState?.errors.name}
          errorMessage={formState?.errors.name?.map((error, id) => {
            return <div key={error + id}>{error}</div>;
          })}
        />
        <Button
          className="bg-blue-400 text-white m-1 font-medium px-6 py-3 rounded-full hover:bg-blue-500 w-full"
          type="submit"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </div>
  )
};