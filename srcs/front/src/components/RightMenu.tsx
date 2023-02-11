import { useState } from 'react';
import { Link } from 'react-router-dom';

const RightMenu: any = () => {
const [isRightMenuOpen, setisRightMenuOpen] = useState(false);

  return (
    <div className="app">
      <div className="right-side">
        <div
          className="right-menu-toggle"
          onClick={() => setisRightMenuOpen(!isRightMenuOpen)}
        >
          <div className={`menu-circle ${isRightMenuOpen ? 'open' : ''}`} />
        </div>
        {isRightMenuOpen && (
          <div className="right-menu">
            <div
              className="right-menu-toggle"
              onClick={() => setisRightMenuOpen(!isRightMenuOpen)}
            >
              <div className={`menu-circle ${isRightMenuOpen ? 'open' : ''}`} />
            </div>
            <div className="menu-item">
              <Link to="/Profile" className="menu-item"> Profile </Link>
            </div>
            <div className="menu-item">Suite</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RightMenu;