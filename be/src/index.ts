import express, { Request, Response } from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/testroutes", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "All routes working fine" });
  } catch (error: any) {
    res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
