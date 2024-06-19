import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
    const data = useLoaderData()
    return (
        <div className="text-4xl bg-gray-500 text-center pt-20">
            Github Followers: {data.followers}
            <img className="p-4" width={200} src={data.avatar_url} alt="Github Image" />
        </div>
    )
}

export default Github;

export const githubInfoLoader = async () => {
    const response = await fetch("https://api.github.com/users/hiteshchoudhary")
    return response.json()
} 