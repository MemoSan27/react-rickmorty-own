import React from "react";
import ReactLoading from "react-loading";
 
export default function Loading() {
    return (
        <div>
            
            
            <ReactLoading className="loading" type="spin" color="#f0f02d" 
                height={100} width={50} />
            
            
        </div>
    );
}