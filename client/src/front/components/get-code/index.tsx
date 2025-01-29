import { useState } from "react";
import NaflowsButton from "../../../../@components/button";
import server from "../../../../server";
import axios from 'axios';
import NaflowsInput from "../../../../@components/input";

interface GetCodeProps {
    data: {
        nom: string;
        prenom: string;
    };
}

const GetCode = ({
    data 
}: GetCodeProps) => {

    const [
        sent, setSent
    ] = useState(false);


    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleClick = () => {
        axios.post(`${server.address}/sendCode/${data.nom}/${data.prenom}`).then((res) => {
            alert(res);
            if (res.status === 200) {
                setMessage('Code envoyé');
            } else {
                setMessage('Failed to send code');
            }
        }).catch((error) => {
            console.error(error);
            setMessage('Failed to send code');
            setSent(false);
        });
    };

    const handleFullCode = () => {
        axios.post(`${server.address}/checkCode/${data.nom}/${data.prenom}/${code}`).then((res) => {
            alert(res);
            if (res.status === 200) {
                setMessage('Code correct');
            } else {
                setMessage('Code incorrect');
            }
        }).catch((error) => {
            console.error(error);
            setMessage('Code incorrect');
        });
    }

    return (
        <div className="get-code">
            <span className="subtext">
                Un code vous sera envoyé à votre mail 
                finissant par univ-jfc.fr
            </span>
            {
                message == "Code envoyé" && (
                    <NaflowsInput
                        type="text"
                        placeholder="Code"
                        fillCondition={(value: string) => value.length >= 0 && value.length <= 6}
                        warning={(value: string) => {
                            if (value.length === 0) {
                                return 'Veuillez renseigner ce champ';
                            } else if (value.length !== 6) {
                                return 'Le code doit faire 6 caractères';
                            } else {
                                return '';
                            }
                        }}
                        onUserInput={(e) => {
                            setCode(e.currentTarget.value);
                        }}
                    />
                )
            }
            <NaflowsButton
                type={`primary ${sent || code.length != 6 ? "disabled" : "" }`}
                onUserClick={() => {
                    if (!sent && code.length != 6) {
                        if (!sent) {
                            handleClick();
                            setSent(true);
                        } else {
                            handleFullCode();
                        }
                    }
                }}
                content={[!sent ? "Envoyer le code" : (
                    code.length == 6 ? "Valider le code" : "Renvoyer le code"
                )]}
                style={{}}
            />
            <span className="message">
                {message}
            </span>

        </div>
    )

};

export default GetCode;