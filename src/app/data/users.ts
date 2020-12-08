export interface UserInterface {
  name: string;
  password: string;
  center: string
}

export const USERS: UserInterface[] = [
    {name: 'a',password: 'a', center: 'center-1'},
    {name: 'b',password: 'b', center: 'center-2'},
    {name: 'c',password: 'c', center: 'center-3'}
];