import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import '../../styles/forms.css';

type TogglePropsType = {
  data: boolean;
  setData: Dispatch<SetStateAction<boolean>>;
};

export default function Toggle({ data, setData }: TogglePropsType) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    if (!data) {
      ref.current.style.transform = 'translateX(0px)';
    } else {
      ref.current.style.transform = 'translateX(30px)';
    }
  }, [data]);

  const handleClickToggle = () => {
    if (!ref.current) return;
    if (data) {
      ref.current.style.transform = 'translateX(0px)';
      setData(!data);
    } else {
      ref.current.style.transform = 'translateX(125%)';
      setData(!data);
    }
  };

  return (
    <div
      className={`switch-toggle${data ? '--on' : '--off'}`}
      onClick={handleClickToggle}
    >
      <div
        className={`toggle-circle${data ? '--on' : '--off'}`}
        ref={ref}
      ></div>
    </div>
  );
}
