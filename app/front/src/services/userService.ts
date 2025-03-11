import { credentialType } from "@/types/credentialType";
import { GetServerSideProps } from "next";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const login = async (credential: credentialType) => {
    return await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credential),
        credentials: 'include'
    });
};

export const getCurrentUser = async () => {
    return await fetch(`${apiUrl}/users/current`, {
        credentials: 'include',
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;

  const res = await fetch(`${apiUrl}/users/current`, {
    headers: { Cookie: req.headers.cookie || '' },
    //credentials: 'include',
  });

  console.log(res);

  if (res.status !== 200) {
    return { redirect: { destination: '/login', permanent: false } };
  }

  const data = await res.json();
  return { props: { user: data.user } };
};