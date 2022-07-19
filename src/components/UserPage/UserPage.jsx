import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

export default function UserPage({ id }) {
  return (
    <div>
      <Sidebar id={id} />
    </div>
  );
}
