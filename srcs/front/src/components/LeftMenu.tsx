import { useState } from 'react';
import { Link } from 'react-router-dom';

const LeftMenu: any = () => {
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);

  return (
    <div className="app">
      <div className="left-side">
        <div
          className="left-menu-toggle"
          onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}
        >
          <div className={`menu-circle ${isLeftMenuOpen ? 'open' : ''}`} />
        </div>
        {isLeftMenuOpen && (
          <div className="left-menu">
            <div
              className="left-menu-toggle"
              onClick={() => setIsLeftMenuOpen(!isLeftMenuOpen)}
            >
              <div className={`menu-circle ${isLeftMenuOpen ? 'open' : ''}`} />
            </div>
            <div className="menu-item">
              <Link to="/Chat" className="menu-item"> Chat </Link>
            </div>
            <div className="menu-item">Suite</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftMenu;