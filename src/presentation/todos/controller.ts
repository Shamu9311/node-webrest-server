import { Request, Response } from 'express';

const todos = [
  { id: 1, text: 'Buy milk', completeddAt: new Date() },
  { id: 2, text: 'Buy bread', completeddAt: null },
  { id: 3, text: 'Buy butter', completeddAt: new Date() },
];

export class TodosController {
  // Inyección de dependencias
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number.` });
    const todo = todos.find((c) => c.id === id);
    todo ? res.status(200).json(todo) : res.status(404).json({ error: `TODO with id ${id} not found.` });
  };

  public createTodoById = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text property is required.' });
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completeddAt: null,
    };
    todos.push(newTodo);
    return res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number.` });
    const todo = todos.find((c) => c.id === id);
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found.` });
    const { text, completeddAt } = req.body;

    todo.text = text || todo.text;

    completeddAt === null
      ? (todo.completeddAt = null)
      : (todo.completeddAt = new Date(completeddAt || todo.completeddAt));

    return res.json(todo);
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) return res.status(400).json({ error: `ID argument is not a number.` });
    const todo = todos.find((c) => c.id === id);
    if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found.` });

    todos.splice(todos.indexOf(todo), 1);

    return res.json(todo);
  };
}
