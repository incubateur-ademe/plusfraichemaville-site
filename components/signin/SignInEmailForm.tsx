"use client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@codegouvfr/react-dsfr/Input";
import React from "react";
import Button from "@codegouvfr/react-dsfr/Button";

export const SignInEmailForm = () => {
  const SigninFormValidation = z.object({
    email: z
      .string()
      .min(1, { message: "Veuillez renseigner votre email" })
      .email("Merci de renseigner un email valide"),
  });
  type SigninFormData = z.infer<typeof SigninFormValidation>;

  const form = useForm<SigninFormData>({
    resolver: zodResolver(SigninFormValidation),
  });

  const onSubmit = ({ email }: SigninFormData) => {
    return signIn("email", { email });
  };

  const disabled = form.formState.isSubmitting || form.formState.isSubmitSuccessful;

  return (
    <form id="login-with-email" onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        label="Votre email professionnel"
        state={form.formState.errors.email?.message ? "error" : "default"}
        stateRelatedMessage={form.formState.errors.email?.message}
        nativeInputProps={{ ...form.register("email") }}
      />
      <Button className={`rounded-3xl text-sm`} type="submit" disabled={disabled}>
        Recevoir le lien de connexion
      </Button>
    </form>
  );
};
