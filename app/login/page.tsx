"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import "../globals.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextResponse } from "next/server";

type SignInSchema = {
	email: string;
	password: string;
	confirmPassword?: string;
};

function Login() {
	const theme = useSelector((state: RootState) => state.theme);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<SignInSchema>();

	const onSubmit = async (data: SignInSchema) => {
		try {
			delete data.confirmPassword;
			console.log("After Deletion", data)
			const response = await fetch("../api/users", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			// const responseData = await response.json();
			console.log(response);

			// Check if the response was successful (status code 2xx)
		} catch (error) {
			console.error("Error:", error);
		} finally {
			// This will be executed regardless of success or failure
			reset();
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull`;

	return (
		<form
			id="form"
			onSubmit={handleSubmit(onSubmit)}
			className={`w-full h-full min-w-fit bg-gradient-to-r from-${theme}-bg to-${theme}-dull flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
		>
			<h1
				className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
			>
				Sign Up
			</h1>
			<input
				{...register("email", { required: "Email is required" })}
				className={modifiedClass}
				type="email"
				placeholder="Email"
			/>
			{errors?.email?.message}
			<input
				{...register("password", {
					required: "Password is required",
					minLength: {
						value: 8,
						message: "Password must be atleast 8 characters",
					},
				})}
				className={modifiedClass}
				type="password"
				placeholder="Password"
			/>
			{errors?.password?.message}
			<input
				{...register("confirmPassword", {
					required: "Confirm password is required",
					minLength: {
						value: 5,
						message: "Password must be atleast 5 characters",
					},
				})}
				className={modifiedClass}
				type="password"
				placeholder="Confirm Password"
			/>
			{errors?.confirmPassword?.message}

			<button
				className={`${
					isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
				} px-7 py-3 text-${theme}-bright rounded-full shadow-lg`}
				type="submit"
			>
				Submit
			</button>
		</form>
	);
}

export default Login;
