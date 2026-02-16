import { LoginResponse } from "@/types";

export const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await fetch(
    "https://apihomolog.innovationbrindes.com.br/api/innova-dinamica/login/acessar",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha: password,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data: LoginResponse = await response.json();
  if (data.status !== 1) {
    throw new Error(data.message);
  }

  return data;
};
