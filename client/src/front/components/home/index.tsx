import { UserType } from '../../types/user.type';
import UserFeed from './components/feed';
import CreateNewPostButton from './components/post/new-post/button';
import ProfileHome from './components/profile/profile-home';

interface HomePageprops {
    user: UserType | null;
}


const HomePage = ({
    user
}: HomePageprops) => {


    return (
        <div className="home-page">
            <div className="home-page-header">
                <ProfileHome user={user} />
            </div>
            <UserFeed user={user} />
            <CreateNewPostButton />
        </div>
    )

}

export default HomePage;