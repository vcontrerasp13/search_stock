"use client";
import React from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function NProgressBar({ children }) {
    return (
        <div>
            <ProgressBar height="5px"
                color="#2DD4BF"
                options={{ showSpinner: false }}
                shallowRouting

            />

            {children}
        </div>
    );
}
