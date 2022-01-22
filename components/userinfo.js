import React from 'react'
import { RiAdminFill } from "react-icons/ri";

function UserInfo() {
    return (
        <div className="flex items-center space-x-4 p-2 mb-5">
            <img className="h-12 rounded-full" src="http://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp" alt="James Bhatta" />
            <div>
                <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">David Beckham</h4>
                <span className="text-sm tracking-wide flex items-center space-x-1">
                    <RiAdminFill /><span className="text-gray-600">Owner</span>
                </span>
            </div>
        </div>
    )
}

export default UserInfo
