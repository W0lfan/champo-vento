
import { useState } from 'react';
import '../../../../public/styles/components/connect/index.scss';
import Login from './login';

const ConnectToService = () => {
    const [data, setData] = useState<{ nom: string; prenom: string, password: string }>({ nom: '', prenom: '', password : '' });



    return (
        <div className="connect-panel">
            <div className="connect-panel-header">
                <div className="title">
                    Se connecter à Champo'Vento
                </div>
                <div className="informations">
                    Pour vous connecter ou créer un compte à ce service, 
                    vous devez renseigner votre nom et prénom, afin qu'un 
                    code vous soit envoyé sur la boîte mail de l'Institut 
                    Universitaire Jean-François Champollion. 
                </div>
            </div>
            <div className="service-inputs">
                <Login data={data} setData={setData} />
            </div>
        </div>
    )
}


export default ConnectToService;