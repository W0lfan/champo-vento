import { useEffect, useState } from "react";
import axios from "axios";
import server from "../../../../../../../../server";
import { UserType } from "../../../../../../types/user.type";
import ProfileHome from "../../../profile/profile-home";
import NaflowsButton from "../../../../../../../../@components/button";
import { formatDate } from "./display-small";
import CommentSection from "./utils/comment-section";
import '../../../../../../../../public/styles/components/home/post/display/big/index.scss';
import UserInterest from "./utils/set-user-interest";
type Post = {
    id?: number,
    title?: string,
    content?: string,
    date?: string,
    pinned?: boolean,
    author_id?: number,
    category_id?: number
}

const DisplayBig = ({ user }: { user: UserType }) => {
    const [poster, setPoster] = useState<{
        nom?: string,
        prenom?: string,
        profilePicture?: string,
        id?: number
    }>({});
    const [category, setCategory] = useState<{
        name? : string,
        color? : string
    }>({});
    const [post, setPost] = useState<Post>({});
    const [interests, setInterests] = useState<{ name: string, user_id: number }[]>([]);
    const [comments, setComments] = useState<
        {
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
        }[]
    >([]);
    const [isUserInterested, setIsUserInterested] = useState(false);
    const fetchData = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("post_id");
        if (postId) {
            axios.post(`${server.address}/get/comments`, {
                post_id: postId
            }).then((res) => {
                setComments(res.data);
                console.log("Fetched comments");
            }).catch((err) => {
                console.error(err);
            });
                
            axios.post(`${server.address}/get/interests`, {
                post_id: postId
            }).then((res) => {
                setInterests(res.data);
            }).catch((err) => {
                console.error(err);
            })
        }
    };


    useEffect(() => {
        
        fetchData();
        const intervalId = setInterval(fetchData, 30000);

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        fetchData();
    }, [isUserInterested])

    useEffect(() => {

        const urlParams = new URLSearchParams(window.location.search);
        const postId = urlParams.get("post_id");

        if (postId) {
            axios.post(`${server.address}/get/post`, {
                id: postId
            }).then((res) => {
                setPost(res.data);
                console.log("Post", res.data);
                if (res.data) {
                    axios.post(`${server.address}/get/category`, {
                        id: res.data.category_id
                    }).then((res) => {
                        setCategory(res.data);
                    }).catch((err) => {
                        console.error(err);
                    })

                    axios.post(`${server.address}/get/user`, {
                        id: res.data.author_id
                    }).then((res) => {
                        setPoster(res.data);
                    }).catch((err) => {
                        console.error(err);
                    })
                } else {
                    window.location.href = '/';
                }
            }).catch((err) => {
                console.error(err);
            })
    

        } else {
            alert('Aucun post n\'a été trouvé');
        }
    }, [])


    


    useEffect(() => {
        console.log("User", user);
        if (user) {
            interests.forEach((interest) => {
                if (interest.user_id === user.id) {
                    setIsUserInterested(true);
                }
            })
        }
    }, [user, interests])



    return (
        <div className="home-page">
            <div className="home-page-header">
                <NaflowsButton
                    content={['Retour']}
                    type="primary"
                    onUserClick={() => {
                        window.location.href = '/';
                    }}
                    style={{}}
                />
                <ProfileHome user={user} />
            </div>
            <div className="page-body">
                <div className="post-display-big">
                    <div className="user-informations">
                        <img src={poster && poster.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="profile picture" />
                        <div className="author">
                            {poster?.prenom} {poster?.nom}
                        </div>
                    </div>
                    <div className="display-body">
                        <div className="display-header">
                            <div className="display-big-header">
                                <div className="header">
                                    <div className="display-small-title">
                                        <div className="title">
                                            {post.title}
                                        </div>
                                        <div className="category" style={{
                                            backgroundColor: category.color,
                                            color: 'white'
                                        }}>
                                            {category.name}
                                        </div>
                                    </div>
                                    <div className="informations">
                                        <span>
                                            {formatDate(post.date as string)}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg>
                                        <span>
                                            {interests.length} personne{interests.length > 1 ? 's' : ''} intéressée{interests.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                </div>
                                <div className="actions">
                                    <div title={`Voir les commentaires`}>
                                        <NaflowsButton
                                            content={['<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-400h400q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Z"/></svg>']}
                                            type="primary"
                                            onUserClick={() => {
                                                document.getElementById('comments')?.scrollIntoView({
                                                    behavior: 'smooth'
                                                });
                                            }}
                                            style={{}}
                                        />
                                    </div>
                                    <UserInterest
                                        postId={post.id as number}
                                        user={user}
                                        isUserInterested={isUserInterested}
                                        setIsUserInterested={setIsUserInterested}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="display-content">
                            {
                                post.content && JSON.parse(post.content).blocks && JSON.parse(post.content).blocks[0].data.text
                            }
                        </div>
                    </div>
                    
                </div>
                <div id="comments">
                    <CommentSection 
                        comments={comments} 
                        postId={post.id as number}
                        setComments={setComments}
                        user={user}
                    />
                </div>
            </div>
        </div>
    )
};

export default DisplayBig;