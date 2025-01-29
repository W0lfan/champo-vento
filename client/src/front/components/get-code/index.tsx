import { useEffect, useState } from "react";
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

    const [sent, setSent] = useState(false);
    const [codeSuccessSent, setCodeSuccessSent] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [isCodeGood, setIsCodeGood] = useState(false);


    const [code, setCode] = useState('');
    interface Message {
        text: string;
        type: 'success' | 'error';
    }

    const [message, setMessage] = useState<Message | null>(null);

    useEffect(() => {
        if (sent && code.length != 6) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [data,sent, code]);

    useEffect(() => {
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }, [message])

    const handleClick = () => {
        axios.post(`${server.address}/sendCode/${data.nom}/${data.prenom}`).then((res) => {
            if (res.status === 200) {
                setMessage({
                    text : 'Code envoyé',
                    type : 'success'
                });
                setCodeSuccessSent(true);
            } else {
                setMessage({
                    text : 'Failed to send code',
                    type : 'error'
                });
            }
        }).catch((error) => {
            console.error(error);
            setMessage({
                text : 'Failed to send code',
                type : 'error'
            });
            setSent(false);
        });
    };

    const handleFullCode = () => {
        axios.post(`${server.address}/checkCode/${data.nom}/${data.prenom}/${code}`).then((res) => {
            if (res.status === 200) {
                setMessage({
                    text : 'Code correct',
                    type : 'success'
                });
                setIsCodeGood(true);
            } else {
                setMessage({
                    text : 'Code incorrect',
                    type : 'error'
                });
            }
        }).catch((error) => {
            console.error(error);
            setMessage({
                text : 'Failed to send code',
                type : 'error'
            });
        });
    }

    return (
        <div className="get-code">
            {
                codeSuccessSent && (
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
                type={`primary ${buttonDisabled ? "disabled" : "" }`}
                onUserClick={() => {
                        if (!sent) {
                            handleClick();
                            setSent(true);
                        } else {
                            handleFullCode();
                        }
                    
                }}
                content={[!sent ? `Envoyer un code à ${data.prenom.toLowerCase()}.${data.nom.toLowerCase()}@etud.univ-jfc.fr` : (
                    (code.length == 6 && !isCodeGood) ? "Valider le code" : (
                        isCodeGood ? "Se connecter" : "Renvoyer un code"
                    )
                )]}
                style={{}}
            />
            {message && <div className={`message ${message.type}`}>{message.text}</div>}

        </div>
    )

};

export default GetCode;