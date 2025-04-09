import { Metadata } from "next";
import { Fragment } from "react";


export const metadata: Metadata = {
    title: "Login",
};


export default function AuthLayout({ children } : { children: React.ReactNode }) {

    return (
        <Fragment>{children}</Fragment>
    );
};