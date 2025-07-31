import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from "express";

class BookController {
  async createBook(req: Request, res: Response) {
    try {
      const { title } = req.body as { title: string };
      const id = req.user;
      const owner = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!owner) return;
      const newBook = await prisma.book.create({
        data: { title, ownerId: owner.id },
      });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: "Error creating book", error });
    }
  }

  async getBooks(req: Request, res: Response) {
    try {
      const books = await prisma.book.findMany();
      res.json(books);
    } catch (error) {
      res.status(400).json({ message: "Error fetching books", error });
    }
  }

  async getBook(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const book = await prisma.book.findUnique({
        where: { id },
      });
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (error) {
      res.status(400).json({ message: "Error fetching book", error });
    }
  }

  // Update a book by ID
  /* async updateBook(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const { title, author } = req.body;
    try {
      const updatedBook = await prisma.book.update({
        where: { id },
        data: { title, author },
      });
      res.json(updatedBook);
    } catch (error) {
      res.status(400).json({ message: "Error updating book", error });
    }
  } */

  // Delete a book by ID
  /* async deleteBook(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    try {
      await prisma.book.delete({
        where: { id },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Error deleting book", error });
    }
  } */
}

export default new BookController();
