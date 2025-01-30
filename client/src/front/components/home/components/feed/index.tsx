import { useState } from "react";
import { UserType } from "../../../../types/user.type";
import '../../../../../../public/styles/components/home/feed/index.scss';

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

    const [selectedCategory, setSelectedCategory] = useState('Tous les posts');

    return (
        <div className="feed">
            <div className="feed-categories">
                {
                    categories.map((category) => {
                        return (
                            <div className={`feed-category ${selectedCategory === category ? 'selected' : ''}`} onClick={() => setSelectedCategory(category)}>
                                {category}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default UserFeed;