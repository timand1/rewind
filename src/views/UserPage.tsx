// import '../styles/_userPage.scss';
import logo from '../assets/logo.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


function UserPage() {
    const navigate = useNavigate();
    const {userId} = useParams();

    const singleUser = useSelector((state: RootState) => state.users).filter(user => user.userId == userId)[0]
    console.log(singleUser)
    
    return (
      <div className="userpage">
            <h2>{singleUser.name}</h2>
      </div>
    )
  }
  
export default UserPage