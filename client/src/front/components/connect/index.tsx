
import { useState } from 'react';
import '../../../../public/styles/components/connect/index.scss';
import NaflowsButton from '../../../../@components/button';
import Login from './login';

const ConnectToService = () => {
    const [setTypeOfService, setServiceType] = useState('login');
    const [data, setData] = useState<{ nom: string; prenom: string }>({ nom: '', prenom: '' });

        
    const serviceText: { [key: string]: { text: string; content: JSX.Element[] } } = {
        "login" : {
            "text" : "Se connecter",
            "content" : [<Login data={data} setData={setData} />]
        },
        "register" : {
            "text" : "S'inscrire",
            "content" : []
        }
    }


    return (
        <div className="connect-panel">
            <div className="service-picker">
                {["login", "register"].map((ser: string) => (
                    <NaflowsButton
                        key={ser}
                        type={ser === setTypeOfService ? 'primary' : 'tertiary'}
                        onUserClick={() => setServiceType(ser)}
                        content={[serviceText[ser].text]}
                        style={{}}
                    />
                ))}
            </div>
            <div className="service-inputs">
                {serviceText[setTypeOfService].content}
            </div>
        </div>
    )
}


export default ConnectToService;