import { useUserContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
const Topbar = () => {
  const { UserDetails } = useUserContext()
  const navigate = useNavigate()
  console.log(UserDetails)

  function gotoSearch() {
    navigate("/search")
  }

  return (
    <nav>
      <div className="progress" id="PreLoaderBar" style={{zIndex: "10000"}}>
        <div className="indeterminate"></div>
      </div>
      <div className="container">
        {/* <i className='bx bx-arrow-back' onclick="window.history.back();"></i> */}
        <h2 className="logo">Conference</h2>
        <div className="search-bar">
          <i className="uil uil-search"></i>
          <input type="search" placeholder="Search for creators, inspiration and projects"
            onClick={gotoSearch} />
        </div>
        <div className="create"> <a href="/notification"><big> <i className="uil uil-bell" style={{ margin: "0 1rem" }}></i></big></a>

          <Link to={`/${UserDetails.UserID}`}>
            <div className="profile-photo">
              <img src={UserDetails.UserDp}
              // onError={user.UserDp='https://cdn.pixabay.com/photo/2022/02/26/18/16/peace-7036144_640.png'}
              />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Topbar