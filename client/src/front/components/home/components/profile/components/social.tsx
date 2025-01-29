import { UserType } from "../../../../../types/user.type";


interface ProfileSocialProps {
    user : UserType | null;
}

const ProfileSocial = ({
    user
} : ProfileSocialProps) => {
    return (
        <div className="profile-social">
            <div className="social">
                <div className="social-title">
                    Réseaux sociaux
                </div>
                <div className="social-content">
                    <div className="social-content-item">
                        <div className="social-content-item-title">
                            Instagram
                        </div>
                        <div className="social-content-item-content">
                            {user?.instagram || "Non renseigné"}
                        </div>
                    </div>
                    <div className="social-content-item">
                        <div className="social-content-item-title">
                            Linkedin
                        </div>
                        <div className="social-content-item-content">
                            {user?.linkedin || "Non renseigné"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSocial;

