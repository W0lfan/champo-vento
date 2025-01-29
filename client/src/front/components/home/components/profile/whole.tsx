import NaflowsButton from '../../../../../../@components/button';
import '../../../../../../public/styles/components/home/profile-home/index.scss';
import { useEffect, useState } from 'react';
import NaflowsPopup from '../../../../../../@components/popup';
import { UserType } from '../../../../types/user.type';
import UserProfileBody from './components/body';
import ProfileInformations from './components/profile-informations';
import ActionsContainer from './components/actions-container';



interface WholeProps {
    user : UserType | null;
}

const WholeUserProfile = ({
    user
}: WholeProps) => {

    

    const [profilePicture, setProfilePicture] = useState<string>(
        user?.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
    );

    useEffect(() => {
        if (user && user.profilePicture) {
            setProfilePicture(user.profilePicture);
        }
    }, [user])

    const [popup, setPopup] = useState<boolean>(false);


    return (
        <div className="user-profile-home">
            <NaflowsButton
                content={["Retourner à l'accueil"]}
                onUserClick={() => {
                    window.location.href = '/';
                }}
                type='primary'
                style={{}}
            />
            <div className="profile-home-global">
                {popup && <NaflowsPopup
                    title="Profile picture updated"
                    content="Your profile picture has been updated"
                    setHidePopup={() => {
                        setPopup(false);
                    }}
                    type='success'
                    close={true}
                    additionnalClasses='big-popup'
                />}
                <ProfileInformations
                    user={user}
                    setProfilePicture={setProfilePicture}
                    setPopup={setPopup}
                    profilePicture={profilePicture}
                />
                <div className="profile-body">
                    <UserProfileBody user={user} />
                    <ActionsContainer />
                </div>
            </div>
        </div>
    )
}

export default WholeUserProfile;