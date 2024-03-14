"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import "../globals.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LogInSchema = {
	username: string;
	password: string;
};

type ForgotPasswordSchema = {
	email: string;
};

function Login() {
	const theme = useSelector((state: RootState) => state.theme);
	// const router = useRouter();
	const [forgotPassword, setForgotPassword] = useState<boolean>(false);
	const [emailSent, setEmailSent] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<LogInSchema>();

	const {
		register: passwordRegister,
		handleSubmit: handlePasswordSubmit,
		reset: passwordReset,
		formState: { errors: passwordErrors, isSubmitting: isSubmittingPassword },
	} = useForm<ForgotPasswordSchema>();

	const handleForgotPassword = async (data: ForgotPasswordSchema) => {
		const response = await fetch("../api/forgotPasswordEmail", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			setEmailSent(true);
		} else {
			const errorMessage = await response.text();
			console.log(errorMessage);
			toast.error(errorMessage);
		}
	};

	const onSubmit = async (data: LogInSchema) => {
		try {
			const response = await fetch("../api/login", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				toast.success("Logged In");
			} else {
				const errorMessage = await response.text();
				toast.error(errorMessage);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			reset();
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull transition-all duration-300 ease-in-out`;
	const modifiedClass2 = `w-80 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull transition-all duration-300 ease-in-out`;

	if (!forgotPassword)
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
					className={`text-${theme}-bright text-opacity-30 hover:text-opacity-100 -mb-4 text-xs -mt-5 translate-x-20`}
					onClick={() => setForgotPassword(true)}
				>
					Forgot password?
				</button>
				<button
					className={`${
						isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
					} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
					type="submit"
					disabled={isSubmitting}
				>
					Submit
				</button>
				<p className="text-sm">
					Don&apos;t have an account?{" "}
					<Link
						href="/signup"
						className={`underline text-${theme}-main hover:text-opacity-70`}
					>
						Sign Up Here
					</Link>
				</p>
				<ToastContainer position="top-center" hideProgressBar />
			</form>
		);
	else if (!emailSent) {
		return (
			<form
				id="form"
				onSubmit={handlePasswordSubmit(handleForgotPassword)}
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-5xl font-bold mb-10`}
				>
					Forgot Password
				</h1>
				<p
					className={`w-80 text-sm text-${theme}-bright text-opacity-70 -mt-10 mb-6`}
				>
					Enter your email and we will send you a link to reset your password
				</p>
				<input
					{...passwordRegister("email", { required: "Email is required" })}
					className={modifiedClass2}
					type="email"
					placeholder="Email"
				/>
				{passwordErrors?.email?.message}

				<button
					className={`${
						isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
					} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
					type="submit"
				>
					Submit
				</button>
				<ToastContainer position="top-center" hideProgressBar />
			</form>
		);
	} else {
		return (
			<main
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
				>
					Reset Password
				</h1>
				<p className={`text-lg text-${theme}-bright ml-10 mr-10`}>
					An email has been sent to your registered email address with
					instructions for resetting your password
				</p>
				<p className={`text-lg text-${theme}-bright mb-10 ml-10 mr-10`}>
					This email may take a few minutes to arrive to the inbox
				</p>
			</main>
		);
	}
}

export default Login;