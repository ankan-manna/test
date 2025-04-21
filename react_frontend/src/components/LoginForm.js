import React from 'react';
import { useForm } from 'react-hook-form';
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
import { loginUser } from '../api';
import { fetchUserDetails } from '../api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const response = await loginUser(data);
    if (response.success) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      await fetchUserDetails();
      form.reset();
      navigate("/");
    } else {
      console.error("Login failed:", response.message);
      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login Form</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailOrUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="emailOrUsername">Email or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email or username" {...field} id="emailOrUsername" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} id="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;