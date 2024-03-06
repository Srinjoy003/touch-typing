"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import "../globals.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextResponse } from "next/server";

type LogInSchema = {
	username: string;
	password: string;
};

function Login() {
	const theme = useSelector((state: RootState) => state.theme);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<LogInSchema>();

	const onSubmit = async (data: LogInSchema) => {
		try {
			const response = await fetch("../api/login", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			console.log(response);

		} catch (error) {
			console.error("Error:", error);
		} finally {
			reset();
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull`;

	return (
		<form
			id="form"
			onSubmit={handleSubmit(onSubmit)}
			className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
		>
			<h1
				className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
			>
				Log In
			</h1>
			<input
				{...register("username", { required: "Username is required" })}
				className={modifiedClass}
				type="text"
				placeholder="Username"
			/>
			{errors?.username?.message}
			<input
				{...register("password", {
					required: "Password is required",
				})}
				className={modifiedClass}
				type="password"
				placeholder="Password"
			/>

			<button
				className={`${
					isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
				} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
				type="submit"
			>
				Submit
			</button>
			<p className="text-sm">
				Don&apos;t have an account?{" "}
				<a className={`underline text-${theme}-main`}>Sign Up Here</a>
			</p>
		</form>
	);
}

export default Login;
