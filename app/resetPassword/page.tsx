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
import { useSearchParams } from "next/navigation";

type ResetPasswordSchema = {
	password: string;
	confirmPassword: string;
};

function Login() {
	const theme = useSelector((state: RootState) => state.theme);
	// const router = useRouter();
	const [passwordReset, setPasswordReset] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<ResetPasswordSchema>();

	const searchParams = useSearchParams();

	const onSubmit = async (formData: ResetPasswordSchema) => {
		const token = searchParams.get("token");
		if (!token) {
			toast.error("Cannot update password for this account");
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			toast.error("Password and Confirmed password do not match");
			return;
		}
		try {
			const data = { password: formData.password, token: token };
			const response = await fetch("../api/resetPassword", {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				setPasswordReset(true);
			} else {
				const errorMessage = await response.text();
				toast.error(errorMessage, {
					position: "top-center",
					hideProgressBar: true,
				});
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			reset();
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull transition-all duration-300 ease-in-out`;
	if (!passwordReset)
		return (
			<form
				id="form"
				onSubmit={handleSubmit(onSubmit)}
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
				>
					Reset Password
				</h1>
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
						required: "Confirm Password is required",
						minLength: {
							value: 8,
							message: "Password must be atleast 8 characters",
						},
					})}
					className={modifiedClass}
					type="password"
					placeholder="Confirm Password"
				/>

				<button
					className={`${
						isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
					} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
					type="submit"
					disabled={isSubmitting}
				>
					Submit
				</button>

				<ToastContainer position="top-center" hideProgressBar />
			</form>
		);
	else {
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
					Your password has been successfully reset, and your account is now
					secured with a new password. You can now log in with your new
					password.
				</p>

				<Link
					href="/login"
					className={`underline text-${theme}-main hover:text-opacity-70`}
				>
					Log In Here
				</Link>
			</main>
		);
	}
}

export default Login;
