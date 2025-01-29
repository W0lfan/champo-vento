import { UserType } from '../../types/user.type';
import ProfileHome from './components/profile/profile-home';

interface HomePageprops {
    user : UserType| null;
}


const HomePage = ({
    user
} : HomePageprops) => {


    return (
        <div className="home-page">
            <ProfileHome user={user} />
        </div>
    )
  
}

export default HomePage;