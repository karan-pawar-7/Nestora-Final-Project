/**
 * Nestora Application Constants & Types (JavaScript)
 */

export const ROOM_TYPES = [
  'Studio',
  'Private Room',
  'Penthouse Suite',
  'Loft',
  '1-Bedroom'
];

export const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Loft',
  'Condo',
  'Townhouse',
  'Studio'
];

export const CITIES = [
  'San Francisco',
  'New York',
  'Austin',
  'London',
  'Tokyo',
  'Berlin'
];

export const USER_ROLES = {
  TENANT: 'tenant',
  OWNER: 'owner'
};

export const LISTING_STATUSES = [
  'Draft',
  'Pending Approval',
  'Published',
  'Booked',
  'Paused',
  'Expired'
];

export default {
  ROOM_TYPES,
  PROPERTY_TYPES,
  CITIES,
  USER_ROLES,
  LISTING_STATUSES
};
