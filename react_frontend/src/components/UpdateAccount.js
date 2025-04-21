import React from 'react';
import { updateAccount } from "../api";
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
import { useNavigate } from 'react-router-dom';

const UpdateAccount = () => {
  const form = useForm({
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const response = await updateAccount(values);
      console.log(response);
      alert("Account updated!");
      navigate('/');
    } catch (error) {
      console.error("Failed to update account:", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Update Account</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="update-account-fullName">Full Name</FormLabel>
                  <FormControl>
                    <Input type="text" id="update-account-fullName" placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="update-account-email">Email</FormLabel>
                  <FormControl>
                    <Input type="email" id="update-account-email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update Account
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
};

export default UpdateAccount;