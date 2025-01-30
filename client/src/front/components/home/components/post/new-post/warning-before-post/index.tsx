import axios from "axios";
import { UserType } from "../../../../../../types/user.type";
import server from "../../../../../../../../server";
import NaflowsPopup from "../../../../../../../../@components/popup";
import NaflowsButton from "../../../../../../../../@components/button";
import '../../../../../../../../public/styles/components/home/post/warning/index.scss';

interface WarningBeforePostProps {
    editorContent: string;
    categoryID: number;
    title: string;
    user: UserType | null;
    setDisplayAlert: (display: boolean) => void;
}

const WarningBeforePost = ({
    editorContent,
    categoryID,
    title,
    user,
    setDisplayAlert
}: WarningBeforePostProps) => {


    const postContent = () => {
        console.log(
            user
        )
        axios.post(`${server.address}/post`, {
            title,
            content: editorContent,
            category_id: categoryID,
            author_id: user?.id
        }).then((res) => {
            alert(res.message)
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <div className="warning-before-post">
            <div className="warning-body">
                <div className="title">
                    Êtes-vous sûr de vouloir publier ce post ?
                </div>
                <div className="description">
                    Vous ne pourrez pas modifier le post une fois publié. <br/>
                    Assurez-vous également que le contenu suit nos <a href="/legal/community">règles de la communauté</a>.
                </div>
                <div className="choices">
                    <NaflowsButton
                        content={['Annuler']}
                        type="secondary"
                        onUserClick={() => {
                            setDisplayAlert(false);
                        }}
                        style={{}}
                    />
                    <NaflowsButton
                        content={['Publier']}
                        type="primary"
                        onUserClick={() => {
                            postContent();
                        }}
                        style={{}}
                    />
                </div>
            </div>
        </div>
    )
}

export default WarningBeforePost;