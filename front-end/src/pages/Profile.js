import { useEffect } from "react";

const Profile = ({user, fetchUser}) => {

    useEffect(() => {
        fetchUser()
    }, [])

    const userProfile = () => {
        return (
            <div>
                <h1>Welcome, {user.username}</h1>
            </div>
        )
    }

    const checkForUser = () => {
        let token = localStorage.getItem("authToken")

        if(!user && !token) {
            return (
                <div>
                    <h1>403 Forbidden</h1>
                </div>
            )
        }else if (!user) {
            return (
                <div>
                    <h1>Loading ...</h1>
                </div>
            )
        }
    }
    return (user ? userProfile() : checkForUser())
}

export default Profile