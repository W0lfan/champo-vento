
import '../../../../../../public/styles/components/home/profile-home/index.scss';
import { UserType } from '../../../../types/user.type';

interface ProfileHomeProps {
    user : UserType | null;
}

const ProfileHome = ({
    user
}: ProfileHomeProps) => {



    return (
        <div className="profile-home" onClick={() => {
            if (!user) {
                window.location.href = '/connect';
            } else {
                window.location.href = '/profile';
            }
        }}>
            <div className="profile-picture">
                <img src={user && user.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="profile picture" />
            </div>
            <div className="profile-name">
                {user ? `${user.nom} ${user.prenom}` : "Non connecté"}
            </div>
        </div>
    )
}

export default ProfileHome;