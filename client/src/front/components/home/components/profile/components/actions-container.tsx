import NaflowsButton from "../../../../../../../@components/button";




const ActionsContainer = () => {
    return (
        <div className="profile-actions">
            <NaflowsButton
                content={["Se déconnecter"]}
                onUserClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                }}
                type='primary'
                style={{}}
            />
            <NaflowsButton
                content={["Supprimer le compte"]}
                onUserClick={() => {}}
                type='primary'
                style={{}}
            />
            <NaflowsButton
                content={["Chercher de l'aide"]}
                onUserClick={() => {
                    window.location.href = '/help';
                }}
                type='secondary'
                style={{}}
            />
            <NaflowsButton
                content={["Consulter la politique de données"]}
                onUserClick={() => {
                    window.location.href = '/help';
                }}
                type='secondary'
                style={{}}
            />
        </div>
    )
}

export default ActionsContainer;