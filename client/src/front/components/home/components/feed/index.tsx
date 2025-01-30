import { useEffect, useState } from "react";
import { UserType } from "../../../../types/user.type";
import '../../../../../../public/styles/components/home/feed/index.scss';
import axios from "axios";
import server from "../../../../../../server";
import DisplaySmall from "./components/post/display-small";
import NaflowsButton from "../../../../../../@components/button";

interface UserFeedProps {
        user : UserType | null;
}

const UserFeed = ({
    user
} : UserFeedProps) => {

    const categories = [
        'Tous les posts',
        'Suivis',
        'A propos'
    ];

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.post(`${server.address}/get/posts`, {
            quantity: 10
        }).then((res) => {
            setPosts(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    const [selectedCategory, setSelectedCategory] = useState('Tous les posts');

    return (
        <div className="feed">
            <div className="search-bar">
                <input type="text" placeholder="Rechercher un post" />
                <NaflowsButton
                    content={['Rechercher']}
                    type="primary"
                    onUserClick={() => {}}
                    style={{}}
                />
            </div>
            {
                posts && posts.map((post) => {
                    return (
                        <DisplaySmall post={post} />
                    )
                })
            }
        </div>
    )
}

export default UserFeed;