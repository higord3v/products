"use server";

import { loginRequest } from "@/services/loginRequest";
import { FormState } from "@/types";
import { redirect } from "next/navigation";
import { createSession } from "../lib/session";
import { useAuthStore } from "@/store/authStore";
export async function signIn(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  let success = false;
  try {
    const response = await loginRequest({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    await createSession(response.token_de_acesso, response.dados_usuario);
    success = true;
  } catch (error: any) {
    console.log(error);
    return {
      errors: {
        email: [error.message],
      },
    };
  }
  if (success) {
    redirect("/products");
  }
}
