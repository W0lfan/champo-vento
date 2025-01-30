import { useEffect } from "react";
import { formatDate } from "../display-small";
import '../../../../../../../../../public/styles/components/home/post/display/big/comments.scss';
import NaflowsButton from "../../../../../../../../../@components/button";
import axios from "axios";
import { UserType } from "../../../../../../../types/user.type";
import server from "../../../../../../../../../server";

type Comment = {
    id: number,
    author_id: number,
    post_id: number,
    content: string,
    date: string,
    user : {
        nom: string,
        prenom: string,
        profilePicture: string
    }
}

const CommentSection = ({ comments, postId, setComments, user } : 
    { comments: Comment[], postId: number, setComments: React.Dispatch<React.SetStateAction<Comment[]>>, user : UserType | null }
) => {
    useEffect(() => {
        // This effect will run whenever the comments state changes
    }, [comments]);

    return (
        <div className="post-comments">
            <div className="comments-section">
                {
                    comments ? (
                        comments.map((comment: Comment) => {
                            return (
                                <div className="comment" key={comment.id}>
                                    <div className="comment-body">
                                        <div className="comment-header">
                                            <div className="comment-author" onClick={() => {
                                                window.location.href = `/profile/?user_id=${comment.user.id}`;
                                            }}>
                                                <img src={comment.user.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="profile picture" />
                                                <span>
                                                    {comment.user.prenom} {comment.user.nom}
                                                </span>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg>
                                            <div className="comment-date">
                                                {formatDate(comment.date)}
                                            </div>
                                        </div>
                                        <div className="comment-content">
                                            <span>
                                                {comment.content}
                                            </span>
                                        </div>
                                    </div>
                                    {
                                        comment.author_id === Number(user?.id) && (
                                            <NaflowsButton
                                                content={['<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm120-160q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280Z"/></svg>']}
                                                type="primary"
                                                onUserClick={() => {
                                                    axios.post(`${server.address}/delete/comment`, {
                                                        comment_id: comment.id,
                                                        author_id: user?.id
                                                    }).then(() => {
                                                        const newComments = comments.filter((c) => c.id !== comment.id);
                                                        const textarea = document.querySelector('.post-comment textarea') as HTMLTextAreaElement;
                                                        textarea.value = '';
                                                        setComments(newComments);
                                                    }).catch((err) => {
                                                        console.error(err);
                                                        alert('Une erreur est survenue');
                                                    })
                                                }}
                                                style={{}}
                                            />
                                        )
                                    }
                                </div>
                            )
                        })
                    ) : (
                        <div className="no-comments">
                            Aucun commentaire pour le moment
                        </div>
                    )
                }
            </div>
            <div className="post-comment">
                {
                    !user && (
                        <div className="overlay">
                            Vous devez être connecté pour commenter
                        </div>
                    )
                }
                <textarea 
                    placeholder="Votre commentaire" 
                    disabled={!user}
                />
                <NaflowsButton
                    content={['Commenter']}
                    type={
                        `primary ${user ? '' : 'disabled'}`
                    }
                    onUserClick={() => {
                        const value = (document.querySelector('.post-comment textarea') as HTMLTextAreaElement)?.value;

                        if (value.length < 1) {
                            return alert('Veuillez entrer un commentaire');
                        } else {
                            axios.post(`${server.address}/post/comment`, {
                                post_id: postId,
                                content: value,
                                author_id: user?.id
                            }).then(() => {
                                const newComments = [...comments];
                                newComments.push({
                                    id: Math.random(),
                                    author_id: Number(user?.id),
                                    post_id: postId,
                                    content: value,
                                    date: new Date().toISOString(),
                                    user: {
                                        nom: user?.nom as string,
                                        prenom: user?.prenom as string,
                                        profilePicture: user?.profilePicture as string
                                    }
                                });
                                setComments(newComments);
                                const textarea = document.querySelector('.post-comment textarea') as HTMLTextAreaElement;
                                textarea.value = '';
                            }).catch((err) => {
                                console.error(err);
                                alert('Une erreur est survenue');
                            })
                        }
                    }}
                    style={{}}
                />
            </div>
        </div>
    )
};

export default CommentSection;