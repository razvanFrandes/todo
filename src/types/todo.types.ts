export interface Todo {
  id: string;
  text: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  location?: Location;
  subTasks?: Todo[];

  dueDate?: Date;
  priority?: Priority;

  repeatInterval?: RepeatInterval;
  reminderDates?: Date[];
  tags?: Tag[];
}

export interface RepeatInterval {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // e.g., every 2 days, every 3 weeks
  endDate?: Date; // optional end date for the repetition
}

export type Priority = 'low' | 'medium' | 'high';

export interface Tag {
  id: string;
  name: string;
  color?: string;
}
// declare 5 statc tags
export const STATIC_TAGS: Tag[] = [
  { id: '1', name: 'Work', color: '#FF5733' },
  { id: '2', name: 'Personal', color: '#33FF57' },
  { id: '3', name: 'Urgent', color: '#3357FF' },
  { id: '4', name: 'Shopping', color: '#F333FF' },
  { id: '5', name: 'Others', color: '#33FFF5' },
];

export interface Location {
  coordinates?: [number, number]; // [latitude, longitude]
  address?: Address;

}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
}
