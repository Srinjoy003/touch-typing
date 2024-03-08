"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxStore/store";
import "../globals.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { OTPInput } from "input-otp";
import { Slot, FakeCaret, FakeDash } from "./verification";

type SignInSchema = {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

function Signup() {
	const theme = useSelector((state: RootState) => state.theme);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
		getValues,
	} = useForm<SignInSchema>();

	const [startVerification, setStartVerification] = useState<boolean>(true);

	const onSubmit = async (data: SignInSchema) => {
		if (data.password !== data.confirmPassword) {
			setErrorMessage(
				"The password entered does not match the confirmed password."
			);
			return;
		}

		try {
			delete data.confirmPassword;

			const user = { ...data, userId: uuidv4() };

			const response = await fetch("../api/signup", {
				method: "POST",
				body: JSON.stringify(user),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				setErrorMessage(null);
				setStartVerification(true);
			} else if (response.status === 404) {
				const errorMessage = await response.text();
				setErrorMessage(errorMessage);
			}
			console.log(response);
		} catch (error) {
			console.error("Error:", error);
		} finally {
			reset();
		}
	};

	const modifiedClass = `w-64 bg-${theme}-navbar placeholder:text-gray-300 text-${theme}-bright h-9 px-2 focus:outline-none border-2 focus:border-${theme}-main border-${theme}-dull`;

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
							value: 5,
							message: "Password must be atleast 5 characters",
						},
					})}
					className={modifiedClass}
					type="password"
					placeholder="Confirm Password"
				/>
				{errors?.confirmPassword?.message}
				{errorMessage && <p>{errorMessage}</p>}
				<button
					className={`${
						isSubmitting ? `bg-${theme}-navbar` : `bg-${theme}-bg`
					} px-7 py-3 text-${theme}-main rounded-full shadow-lg border-${theme}-main border-2 hover:bg-${theme}-navbar hover:border-${theme}-dull hover:text-${theme}-bright mt-5`}
					type="submit"
				>
					Submit
				</button>
				<p className="text-sm">
					Already have an account?{" "}
					<a className={`underline text-${theme}-main`}>Log In Here</a>
				</p>
			</form>
		);
	else
		return (
			<main
				className={`w-full h-full min-w-fit bg-${theme}-bg flex flex-col item-center justify-center text-${theme}-dull items-center gap-8`}
			>
				<h1
					className={`text-center text-${theme}-wrong text-6xl font-bold mb-10`}
				>
					Verification Code
				</h1>
				<p className="-mt-10 mb-10 text-base">
					Please enter the verification code sent to the registered email
					account
				</p>
				<OTPInput
					maxLength={6}
					containerClassName="group flex items-center has-[:disabled]:opacity-30"
					size={100}
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
			</main>
		);
}

export default Signup;
