import NaflowsButton from "../../../../../@components/button";
import '../../../../../public/styles/components/policy/index.scss';


const DataPolicy = () => {
    return (
        <div className="official-component">
            <h1>Politique de données</h1>
            <div className="component-body">
                <img src="https://public.naflows.com/assets/corporate/naflows_full_logotype.png" alt="Naflows logo" />
                <p>
                    Champo'Vento est un projet signé Naflows.
                    À ce titre, les conditions d'utilisation et la politique de données de Naflows s'appliquent à Champo'Vento.
                    <br/>
                    Toute donnée collectée par Champo'Vento est stockée sur les serveurs de Naflows,
                    et est soumise à cette politique.
                </p>
            </div>
            <NaflowsButton
                content={["Consulter la politique de données de Naflows"]}
                onUserClick={() => {
                    window.location.href = 'https://public.naflows.com/legal/data-policy';
                }}
                type='primary'
                style={{}}
            />
        </div>
    );
}

export default DataPolicy;