import { useEffect, useState } from "react";
import NaflowsButton from "../../../../../../../@components/button";
import { UserType } from "../../../../../types/user.type";
import axios from "axios";
import server from "../../../../../../../server";


interface UserProfileBody {
    user : UserType | null;
}

function UserProfileBody({
    user
} : UserProfileBody) {

    interface Role {
        color: string;
        role: string;
    }

    const [userRoles, setUserRoles] = useState<Role[]>([]);

    useEffect(() => {
        if (user) {
            axios.get(`${server.address}/getroles/${user?.id}`).then((res) => {
                setUserRoles(res.data);
            }).catch((error) => {
                console.error(error);
            });
        }
    }, [user])

    return (
        <div className="profile-particular-informations">
            {
                userRoles && (
                <div className="field">
                        <div className="field-content user-roles">
                            {userRoles.map((role) => {
                                return (
                                    <div className="user-role" style={{
                                        backgroundColor : role.color
                                    }}>
                                        {role.role}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }
            <div className="field">
                <div className="field-title">
                    Identité
                </div>
                <div className="field-content">
                    {user?.nom} {user?.prenom}
                </div>
            </div>
            <div className="field">
                <div className="field-title">
                    Adresse email associée
                </div>
                <div className="field-content">
                    {`${user?.prenom.toLowerCase()}.${user?.nom.toLowerCase()}@etud.univ-jfc.fr`}
                </div>
            </div>
            {/*
                <div className="field">
                    <div className="field-title">
                        Réseaux sociaux
                    </div>
                    <div className="field-content">
                        <NaflowsInput
                            type="text"
                            placeholder="Instagram"
                            defaultValue={user?.instagram || ''}
                            onUserInput={() => {

                            }}
                            additionalClasses="background-darker"
                        />
                        <NaflowsInput
                            type="text"
                            placeholder="Linkedin"
                            defaultValue={user?.linkedin || ''}
                            onUserInput={() => {}}
                            additionalClasses="background-darker"
                        />
                    </div>
                </div>
            */}
            <div className="field">
                <div className="field-title">
                    Mot de passe
                </div>
                <div className="field-content">
                    <NaflowsButton
                        type="primary"
                        onUserClick={() => {
                            window.location.href = '/profile/password';
                        }}
                        content={['Modifier le mot de passe']}
                        style={{}}
                    />
                </div>
            </div>
        </div>
    )
}

export default UserProfileBody;

