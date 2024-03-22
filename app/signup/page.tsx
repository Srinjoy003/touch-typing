"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import "../globals.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { OTPInput } from "input-otp";
import { Slot, FakeCaret, FakeDash } from "./verification";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type SignInSchema = {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

function Signup() {
	const theme = useSelector((state: RootState) => state.theme);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<SignInSchema>();

	const [startVerification, setStartVerification] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [verified, setVerified] = useState<boolean>(false);

	const onSubmit = async (data: SignInSchema) => {
		if (data.password !== data.confirmPassword) {
			toast.error("The password and the confirmed password do not match");

			return;
		}

		try {
			setIsLoading(true);

			delete data.confirmPassword;
			const userId = uuidv4();
			setUserId(userId);
			const user = { ...data, userId };

			const response = await fetch("../api/signup", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				setStartVerification(true);
			} else {
				const errorMessage = await response.text();
				toast.error(errorMessage);
			}
			console.log(response);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleVerification = async (code: number) => {
		try {
			setIsLoading(true);
			const response = await fetch("../api/verification", {
				method: "POST",
				body: JSON.stringify({ verificationCode: code, userId }),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				const result = await response.json();
				setVerified(true);


				console.log(result);
			} else {
				const errorMessage = await response.text();
				toast.error(errorMessage);
			}
		} catch (error) {
			console.error("An error occurred:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull transition-all duration-300 ease-in-out`;

	if (!startVerification)
		return (
			<form
				id="form"
				onSubmit={handleSubmit(onSubmit)}
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
				>
					Sign Up
				</h1>
				<input
					{...register("username", { required: "Username is required" })}
					className={modifiedClass}
					type="text"
					placeholder="Username"
				/>
				{errors?.username?.message}
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
							value: 8,
							message: "Password must be atleast 8 characters",
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
					} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
					type="submit"
					disabled={isSubmitting}
				>
					Submit
				</button>

				<p className="text-sm">
					Already have an account?{" "}
					<Link
						href="/login"
						className={`underline text-${theme}-main hover:text-opacity-70`}
					>
						Log In Here
					</Link>
				</p>
				{isLoading && <p>Processing Verification...</p>}
				<ToastContainer position="top-center" hideProgressBar />
			</form>
		);
	else if (!verified)
		return (
			<main
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-4xl sm:text-5xl md:text-7xl font-bold mb-10 ml-5 mr-5`}
				>
					Verification Code
				</h1>
				<p
					className={`-mt-10 mb-3 sm:mb-5 md:mb-7 lg:mb-10 text-sm md:text-base text-${theme}-bright ml-10 mr-10`}
				>
					Please enter the verification code sent to the registered email
					account
				</p>
				<OTPInput
					maxLength={6}
					containerClassName={`group flex items-center has-[:disabled]:opacity-30 text-${theme}-bright`}
					onComplete={handleVerification}
					render={({ slots }) => (
						<>
							<div className="flex">
								{slots.slice(0, 3).map((slot, idx) => (
									<Slot key={idx} {...slot} />
								))}
							</div>

							<FakeDash />

							<div className="flex">
								{slots.slice(3).map((slot, idx) => (
									<Slot key={idx} {...slot} />
								))}
							</div>
						</>
					)}
				/>

				{isLoading && <p>Processing Verification...</p>}
				<ToastContainer position="top-center" hideProgressBar />
			</main>
		);
	else
		return (
			<main
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
				>
					Sign Up
				</h1>
				<p className={`text-lg text-${theme}-bright ml-10 mr-10`}>
					Your account has been succesfully created.
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

export default Signup;
