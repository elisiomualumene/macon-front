import React from "react";

// this compontent receives a property children that recives children as key like children: {children: string message}
const ErrorMessageDiv = ({children}, props) => 
    <div className="text-start text-danger fst-italic" style={{fontSize: '.85rem'}}>{children}</div>

export default ErrorMessageDiv;