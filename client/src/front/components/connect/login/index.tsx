import NaflowsInput from "../../../../../@components/input";
import GetCode from "../../get-code";

interface LoginProps {
    data: {
        nom: string;
        prenom: string;
    };
    setData: (e: { nom: string; prenom: string }) => void;
}

const Login = ({
    data,
    setData
}: LoginProps) => {
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
                    />
                </div>
                <GetCode
                    data={data}
                />
            </div>
        </>
    )
}

export default Login;   