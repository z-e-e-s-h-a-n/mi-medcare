"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

interface ErrorPageProps {
    statusCode?: number;
    title?: string;
    message?: string;
    redirectPath?: string;
    redirectText?: string;
}

const defaultMessages: Record<number, { title: string; message: string }> = {
    403: {
        title: "Access Forbidden",
        message: "You do not have permission to view this page.",
    },
    404: {
        title: "Page Not Found",
        message: "Sorry, the page you are looking for does not exist.",
    },
    500: {
        title: "Server Error",
        message: "Something went wrong on our end. Please try again later.",
    },
};

const ErrorPage: React.FC<ErrorPageProps> = ({
    statusCode = 404,
    title,
    message,
    redirectPath = "/",
    redirectText = "Go Home",
}) => {
    const errorData = defaultMessages[statusCode] || defaultMessages[404];

    return (
        <main className="flex-center min-h-screen bg-background text-foreground px-4">
            <div className="max-w-lg text-center space-y-6">
                <div className="flex-center flex-col gap-4">
                    <AlertCircle className="size-16 text-destructive" />
                    <h1 className="text-4xl font-bold">{title || errorData.title}</h1>
                    <p className="text-muted-foreground">{message || errorData.message}</p>
                </div>
                <Link
                    href={redirectPath}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition"
                >
                    <ArrowLeft className="size-4" />
                    {redirectText}
                </Link>
            </div>
        </main>
    );
};

export default ErrorPage;
