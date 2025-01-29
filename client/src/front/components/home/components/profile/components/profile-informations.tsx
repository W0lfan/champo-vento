import axios from "axios";
import NaflowsButton from "../../../../../../../@components/button";
import { UserType } from "../../../../../types/user.type";
import server from "../../../../../../../server";


interface ProfileInformationsProps {
    user: UserType | null;
    profilePicture: string;
    setProfilePicture: (profilePicture: string) => void;
    setPopup: (popup: boolean) => void;
}

const ProfileInformations = ({
    user,
    profilePicture,
    setProfilePicture,
    setPopup
}: ProfileInformationsProps) => {

    const handleProfilePictureChange = () =>  {
        const fileInput = document.getElementById('file') as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                axios.post(`${server.address}/upload`, {
                    userID : user?.id,
                    profilePicture : base64String,
                    token : localStorage.getItem('token')
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.success) {
                        setPopup(true);
                        setProfilePicture(base64String);
                    } else {
                        alert("Failed to update profile picture");
                    }
                }).catch((error) => {
                    console.error(error);
                    alert("Failed to update profile picture");
                });
            };
            reader.readAsDataURL(file);
        }
    }



    return (
        <div className="profile-informations">
            <div className="profile-picture">
                <img src={profilePicture} alt="profile picture" />
                <NaflowsButton
                    content={['<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M800-680q-17 0-28.5-11.5T760-720v-40h-40q-17 0-28.5-11.5T680-800q0-17 11.5-28.5T720-840h40v-40q0-17 11.5-28.5T800-920q17 0 28.5 11.5T840-880v40h40q17 0 28.5 11.5T920-800q0 17-11.5 28.5T880-760h-40v40q0 17-11.5 28.5T800-680ZM440-260q75 0 127.5-52.5T620-440q0-75-52.5-127.5T440-620q-75 0-127.5 52.5T260-440q0 75 52.5 127.5T440-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM120-120q-33 0-56.5-23.5T40-200v-480q0-33 23.5-56.5T120-760h126l50-54q11-12 26.5-19t32.5-7h205q17 0 28.5 11.5T600-800v60q0 25 17.5 42.5T660-680h20v20q0 25 17.5 42.5T740-600h60q17 0 28.5 11.5T840-560v360q0 33-23.5 56.5T760-120H120Z"/></svg>']}
                    onUserClick={() => {
                        document.getElementById('file')?.click();
                    }}
                    type='primary'
                    style={{}}
                />
                <input type="file" id="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => {const file = e.target.files?.[0];if (file) {if (file.size > 2 * 1024 * 1024) {alert("File must be less than 2MB");e.target.value = "";} else {console.log("File:", file);handleProfilePictureChange();}}}} />
            </div>
            <div className="profile-informations-header">
                <div className="profile-name">
                    {user ? (
                        user.username ? user.username : `${user.nom} ${user.prenom}`
                    ) : "Non connecté"}
                </div>
                <div className="profile-licence">
                    {user && user.licence ? user.licence : "Aucune licence"}
                </div>
            </div>
        </div>
    )
}

export default ProfileInformations;