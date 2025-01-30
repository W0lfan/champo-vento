import axios from "axios";
import { useEffect, useState } from "react";
import server from "../../../../../../../../server";
import '../../../../../../../../public/styles/components/home/post/display/small/index.scss';

export type Post = {
    id: number,
    title: string,
    content: string,
    date: string,
    pinned: boolean,
    author_id: number,
    category_id: number
}


export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (months > 0) {
        return `Il y a ${months} moi${months > 1 ? 's' : ''}`;
    } else if (days > 0) {
        return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
        return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
        return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
        return `Il y a ${seconds} seconde${seconds > 1 ? 's' : ''}`;
    }
}

const DisplaySmall = ({ post }: { post: Post }) => {


    const [user, setUser] = useState<{
        nom?: string,
        prenom?: string,
        profilePicture?: string,
        id?: number
    }>({});
    const [category, setCategory] = useState<{
        name?: string,
        color?: string
    }>({});
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        axios.post(`${server.address}/get/user`, {
            id: post.author_id
        }).then((res) => {
            setUser(res.data);
        }).catch((err) => {
            console.error(err);
        })

        axios.post(`${server.address}/get/category`, {
            id: post.category_id
        }).then((res) => {
            setCategory(res.data);
        }).catch((err) => {
            console.error(err);
        })

        axios.post(`${server.address}/get/interests`, {
            post_id: post.id
        }).then((res) => {
            setInterests(res.data);
        }).catch((err) => {
            console.error(err);
        })
    }, [])


    return (
        <div className="display-small" onClick={() => {
            window.location.href = `/post/?post_id=${post.id}`;
        }}>
            <div className="user-informations">
                <img src={user && user.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'} alt="profile picture" />
                <div className="author">
                    {user?.prenom} {user?.nom}
                </div>
            </div>

            <div className="display-body">
                <div className="display-header">
                    <div className="display-small-header">
                        <div className="display-small-title">
                            {
                                post.pinned && (
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M640-760v280l68 68q6 6 9 13.5t3 15.5v23q0 17-11.5 28.5T680-320H520v234q0 17-11.5 28.5T480-46q-17 0-28.5-11.5T440-86v-234H280q-17 0-28.5-11.5T240-360v-23q0-8 3-15.5t9-13.5l68-68v-280q-17 0-28.5-11.5T280-800q0-17 11.5-28.5T320-840h320q17 0 28.5 11.5T680-800q0 17-11.5 28.5T640-760Z" /></svg>
                                )
                            }
                            <span>{post.title}</span>
                        </div>
                        <div className="category" style={{
                            backgroundColor: category?.color,
                            color: 'white'
                        }}>
                            {category?.name}
                        </div>
                    </div>
                </div>
                <div className="display-small-snippet">
                    {
                        JSON.parse(post.content).blocks && JSON.parse(post.content).blocks[0].data.text
                    }
                </div>
            </div>
            <div className="display-small-informations">
                <div className="date">
                    {
                        formatDate(post.date)
                    }
                </div>
                <div className="interests" title={`${interests.length} personne${interests.length > 1 ? 's' : ''} intéressée${interests.length > 1 ? 's' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-200q-17 0-28.5-11.5T160-240q0-17 11.5-28.5T200-280h40v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h40q17 0 28.5 11.5T800-240q0 17-11.5 28.5T760-200H200ZM480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM120-560q-17 0-28.5-13T82-603q8-75 42-139.5T211-855q13-11 29.5-10t26.5 15q10 14 8 30t-15 28q-39 37-64 86t-33 106q-2 17-14 28.5T120-560Zm720 0q-17 0-29-11.5T797-600q-8-57-33-106t-64-86q-13-12-15-28t8-30q10-14 26.5-15t29.5 10q53 48 87 112.5T878-603q2 17-9.5 30T840-560Z" /></svg>
                    <span>{interests.length}</span>
                </div>
            </div>

        </div>
    )
};

export default DisplaySmall;