import { useState, useRef, useEffect } from "react";
import NaflowsButton from "../../../../../@components/button";
import NaflowsInput from "../../../../../@components/input";
import GetCode from "../../get-code";

interface LoginProps {
    data: {
        nom: string;
        prenom: string;
        password: string;
    };
    setData: (e: { nom: string; prenom: string; password: string }) => void;
}

const Login = ({
    data,
    setData
}: LoginProps) => {

    const [viewMDP, setViewMDP] = useState(false);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [buttonHeight, setButtonHeight] = useState<string | number>("40px");

    useEffect(() => {
        if (passwordInputRef.current) {
            const inputElement = passwordInputRef.current.querySelector("input");
            setButtonHeight((inputElement ? inputElement.clientHeight + 4 : "50px"));
        }
    }, []);

    return (
        <>
            <div className="input-container column">
                <div className="input-container row">
                    <NaflowsInput
                        type="text"
                        placeholder="Nom"
                        fillCondition={(value: string) => value.length > 0}
                        warning={(value: string) => value.length > 0 ? '' : 'Veuillez renseigner ce champ'}
                        onUserInput={(e) => {
                            setData({
                                ...data,
                                nom: e.currentTarget.value
                            })
                        }}
                        additionalClasses="full-length"
                    />
                    <NaflowsInput
                        type="text"
                        placeholder="Prénom"
                        fillCondition={(value: string) => value.length > 0}
                        warning={(value: string) => value.length > 0 ? '' : 'Veuillez renseigner ce champ'}
                        onUserInput={(e) => {
                            setData({
                                ...data,
                                prenom : e.currentTarget.value
                            })
                        }}
                        additionalClasses="full-length"
                    />
                </div>
                <div className="input-container row">
                    <div style={{width : "100%"}} ref={passwordInputRef}>
                        <NaflowsInput
                            type={viewMDP ? 'text' : 'password'}
                            additionalClasses="full-length"
                            placeholder="Mot de passe"
                            fillCondition={(value: string) => value.length > 0}
                            warning={(value: string) => value.length > 0 ? '' : 'Veuillez renseigner ce champ'}
                            onUserInput={(e) => {
                                setData({
                                    ...data,
                                    password : e.currentTarget.value
                                })
                            }}  
                        />

                    </div>
                    <NaflowsButton
                        content={[viewMDP ? 'Cacher' : 'Voir']}
                        onUserClick={() => setViewMDP(!viewMDP)}
                        type="secondary"
                        style={{ width : "100px", height : buttonHeight }}
                    />
                </div>
                {
                    data.nom && data.prenom && <GetCode
                        data={data}
                    />
                }
            </div>
        </>
    )
}

export default Login;