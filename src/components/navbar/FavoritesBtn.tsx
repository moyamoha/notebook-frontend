import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { setCurrentNotebook } from '../../state/slices/data.slice';
import { setActiveNav } from '../../state/slices/ui.slice';
import { IStore } from '../../state/types';

export default function FavoritesBtn() {
  const activeNav = useSelector((s: IStore) => s.ui.activeNav);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    if (activeNav !== 'favorites') {
      dispatch(setActiveNav('favorites'));
      navigate('/favorites');
      dispatch(setCurrentNotebook(null));
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
