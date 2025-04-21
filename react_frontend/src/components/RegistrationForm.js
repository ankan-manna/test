import React from 'react';
import { registerUser } from '../api';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const RegistrationForm = () => {
  const form = useForm();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      await registerUser(formData);
      const { email, password } = Object.fromEntries(formData.entries());
      await loginUser({ email, password });

      navigate('/');
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Registration Form</h2>
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" type="text" id="fullName" {...field} />
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
              <FormLabel htmlFor="email-register">Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" id="email-register" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username-register">Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" type="text" id="username-register" {...field} />
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
              <FormLabel htmlFor="password-register">Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" id="password-register" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="avatar-register">Avatar</FormLabel>
              <FormControl>
                <Input type="file" id="avatar-register" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
              <FormControl>
                <Input type="file" id="coverImage" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationForm;