import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { URL } from "../models/URL";
import { User } from "../models/User";

export const shortenUrl = async (req: Request, res: Response) => {
  const { linkOriginal } = req.body;

  if (!linkOriginal) {
    return res.status(400).json({ message: "A URL original é obrigatória." });
  }

  try {
    const generateShortUrl = (length: number): string => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };

    const shortCode = generateShortUrl(6);
    const short_url = `http://localhost/${shortCode}`;

    const shortenedUrl = new URL();
    shortenedUrl.original_url = linkOriginal;
    shortenedUrl.short_url = short_url;

    if (req.user) {
      shortenedUrl.user = req.user as User;
    } else {
      shortenedUrl.user = null;
    }

    await AppDataSource.getRepository(URL).save(shortenedUrl);
    res.json({
      short_url: short_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Error shortening URL", error });
    console.log(error);
  }
};

export const shortURLs = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    if (!user || !user.id) {
      return res.status(400).json({ message: "User not found" });
    }

    const urls = await AppDataSource.getRepository(URL).find({
      where: { user: { id: user.id } },
    });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ message: "Error getting URLs", error });
    console.log(error);
  }
};

export const deleteUrl = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid URL ID" });
  }

  try {
    const url = await AppDataSource.getRepository(URL).findOneBy({ id });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    await AppDataSource.getRepository(URL).delete({ id });

    res.json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting URL", error });
    console.log(error);
  }
};

export const updateUrl = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { original_url, short_url } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid URL ID" });
  }

  try {
    const url = await AppDataSource.getRepository(URL).findOneBy({ id });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.original_url = original_url;
    url.short_url = short_url;

    await AppDataSource.getRepository(URL).save(url);

    res.json(url);
  } catch (error) {
    res.status(500).json({ message: "Error updating URL", error });
    console.log(error);
  }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
  const short_url = req.params.short_url;

  try {
    const url = await AppDataSource.getRepository(URL).findOneOrFail({
      where: { short_url },
    });

    url.clicks++;

    await AppDataSource.getRepository(URL).save(url);

    res.redirect(url.original_url);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error redirecting to original URL", error });
  }
};
