import React from "react";
import { baseUrl } from "../../../Api/Api";
import { ReactComponent as GoogleIcon } from "../../../Assets/icons8-google.svg";

export function Google() {
    return <div className="google-wraper">
                    <a href={`${baseUrl}/login-google`}>
                    <GoogleIcon className="google-icon" />
                    <p className="par">Continue with Google</p>
                    </a>
                </div>;
}
