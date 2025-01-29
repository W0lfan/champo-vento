import { useState, useRef, useEffect } from "react";
import NaflowsButton from "../../../../../@components/button";
import NaflowsInput from "../../../../../@components/input";
import GetCode from "../../get-code";



const hashPassword = (password: string) => {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
};

interface LoginProps {
    data: {
        nom: string;
        prenom: string;
        password: string;
    };
    setData: (e: { nom: string; prenom: string; password: string }) => void;
}


const passwordCondition = (ps : string) => {
    return (
        ps.length > 8 &&
        /[a-z]/.test(ps) &&
        /[A-Z]/.test(ps) &&
        /[0-9]/.test(ps) &&
        /[^a-zA-Z0-9]/.test(ps)
    )
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
                                nom: e.currentTarget.value.replace(" ","")
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
                                prenom : e.currentTarget.value.replace(" ","")
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
                            fillCondition={(value: string) => passwordCondition(value)}
                            warning={(value: string) => passwordCondition(value) ? '' : 'Le mot de passe doit faire au moins 8 caractères, contenir un chiffre, un caractère spécial, une majuscule et une minuscule.'}
                            onUserInput={(e) => {
                                const cryptedValue = hashPassword(e.currentTarget.value);
                                setData({
                                    ...data,
                                    password : cryptedValue
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