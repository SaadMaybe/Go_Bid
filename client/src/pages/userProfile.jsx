import React from 'react'
import { useParams } from 'react-router';

export const userProfile = () => {
    const { UserID } = useParams();
    return (
        <div>
            { UserID }
            userProfile
        </div>
    )
}
