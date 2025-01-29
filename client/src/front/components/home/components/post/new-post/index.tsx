import '../../../../../../../public/styles/components/home/post/new/index.scss';
import { UserType } from '../../../../../types/user.type';

interface NewPostProps {
    user : UserType | null;
}

function NewPost({
    user
} : NewPostProps) {
    return (
        <div className="new-post">
            <div className="new-post-edit">
                <div className="title">
                    <input type="text" placeholder="Titre" />
                </div>
                <div className="content">
                    <textarea placeholder="Contenu"></textarea>
                </div>
            </div>
        </div>
    )
}

export default NewPost;