import React from 'react';
import { TenantDashboardPage } from './TenantDashboardPage';
import { OwnerDashboardPage } from './OwnerDashboardPage';

export const DashboardPage = ({
  user,
  allRooms,
  wishlist,
  onToggleWishlist,
  onSelectRoom,
  onNavigate,
  onLogout,
  onUpdateUser,
  onAddNewRoom,
  onUpdateRoom,
  onDeleteRoom,
}) => {
  if (user.role === 'owner') {
    return (
      <OwnerDashboardPage
        user={user}
        ownerRooms={allRooms.filter((r) => r.host.name === user.name || r.ownerId === user.id || true)}
        onAddNewRoom={onAddNewRoom}
        onUpdateRoom={onUpdateRoom}
        onDeleteRoom={onDeleteRoom}
        onSelectRoom={onSelectRoom}
        onNavigate={onNavigate}
        onLogout={onLogout}
        onUpdateUser={onUpdateUser}
      />
    );
  }

  return (
    <TenantDashboardPage
      user={user}
      allRooms={allRooms}
      wishlist={wishlist}
      onToggleWishlist={onToggleWishlist}
      onSelectRoom={onSelectRoom}
      onNavigate={onNavigate}
      onLogout={onLogout}
      onUpdateUser={onUpdateUser}
    />
  );
};
