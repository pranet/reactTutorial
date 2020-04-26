// @flow

import React from 'react';
import './index.css';

type Props = {
  value: string,
  onClick: () => void,
  ...
};

export function Square(props: Props) {
    return (
      <button className="square" onClick={() => props.onClick()}>
        {props.value}
      </button>
    );
}

