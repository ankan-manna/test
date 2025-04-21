import React from 'react';
import { changePassword } from "../api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "shadcn/ui";
import { Input } from "shadcn/ui";
import { Button } from "shadcn/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const form = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      await changePassword(data);
      alert("Password changed!");
      navigate("/");
    } catch (error) {
      console.error("Failed to change password:", error.message);
      // Handle error (e.g., display error message) - you might want to set an error in the form here
      // form.setError("root.serverError", { message: error.message });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Change Password</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your old password"
                      {...field}
                      className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="newPassword">New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your new password"
                      {...field}
                      className="border rounded-md py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              Change Password
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ChangePassword;