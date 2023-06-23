import { Loan } from './Loan'

export const LOAN_DATA_LIST: Loan[] = [
  {
    id: 1,
    client: { id: 1, name: "Pepe" },
    game: {
      id: 1,
      title: "Juego 1",
      age: 6,
      category: { id: 1, name: "Categoría 1" },
      author: { id: 1, name: "Autor 1", nationality: "Nacionalidad 1" },
    },
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    client: { id: 2, name: "Juan" },
    game: {
      id: 2,
      title: "Juego 2",
      age: 12,
      category: { id: 2, name: "Categoría 2" },
      author: { id: 3, name: "Autor 3", nationality: "Nacionalidad 3" },
    },
    startDate: new Date(),
    endDate: new Date(),
  },
];