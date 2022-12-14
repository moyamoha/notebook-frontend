import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineHeart } from 'react-icons/ai';

import { IStore } from '../../state/types';
import { setActiveNav } from '../../state/slices/ui.slice';

export default function FavoritesBtn() {
  const activeNav = useSelector((s: IStore) => s.ui.activeNav);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (activeNav !== 'favorites') {
      dispatch(setActiveNav('favorites'));
      navigate('/favorites');
    }
  };

  return (
    <div
      className={activeNav === 'favorites' ? 'active nav-line' : 'nav-line'}
      onClick={handleClick}
    >
      <AiOutlineHeart className="nav-icon"></AiOutlineHeart>
      <span className="nav-text">Favorites</span>
    </div>
  );
}
