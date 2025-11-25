import dotenv from 'dotenv';
import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import multer from 'multer';
import unzipper from 'unzipper';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';
import connectDB from './config';

import {
  ErrorObject
} from './interface';
import { echo } from './echo';

dotenv.config({ path: path.join(__dirname, '../ENVIRONMENTS.env') });

// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors (print to terminal)
app.use(morgan('dev'));

connectDB();

const PORT: number = parseInt(process.env.PORT || '5000');
const HOST: string = process.env.IP || '127.0.0.1';
const BEATMAPS_DIR = path.resolve(__dirname, '../../frontend/public/beatmapsRaw');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100mb
  },
});

// ====================================================================

function handleFunction(func: () => unknown, res: Response) {
  try {
    res.status(200).json(func());
  } catch (error) {
    const errorObj : ErrorObject = {
      error: error instanceof Error ? error.message : String(error)
    };
    return res.status(400).json(errorObj);
  }
}

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

// Example get request
app.get('/echo', (req: Request, res: Response) => {
  const value = req.query.value as string;

  handleFunction(() => echo(value), res);
});

// ====================================================================

// --------------------- ADD NEW ROUTES BELOW -------------------------

// yo guys do i bother making a function for this just like 1531?
app.post('/api/beatmaps/upload', upload.single('beatmap'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    await fs.promises.mkdir(BEATMAPS_DIR, { recursive: true });
    const originalName = req.file.originalname.toLowerCase();

    if (!originalName.endsWith('.osz')) {
      return res.status(400).json({ error: 'Only .osz files are supported' });
    }

    const baseName = path.basename(originalName, path.extname(originalName)).trim();
    const folderName = baseName.split(/\s+/)[0];
    const targetRoot = path.join(BEATMAPS_DIR, folderName);

    await fs.promises.mkdir(targetRoot, { recursive: true });

    const directory = await unzipper.Open.buffer(req.file.buffer);
    await Promise.all(directory.files.map(async (file: any) => {
      const destinationPath = path.join(targetRoot, file.path);

      if (file.type === 'Directory') {
        await fs.promises.mkdir(destinationPath, { recursive: true });
        return;
      }

      await fs.promises.mkdir(path.dirname(destinationPath), { recursive: true });
      const writeStream = fs.createWriteStream(destinationPath);
      await pipeline(file.stream(), writeStream);
    }));

    res.status(200).json({ message: 'Beatmap uploaded and extracted successfully' });
  } catch (error) {
    console.error('Beatmap upload failed:', error);
    res.status(500).json({ error: 'Failed to process beatmap archive' });
  }
});

// --------------------- ADD NEW ROUTES ABOVE -------------------------

// ====================================================================

app.use((req: Request, res: Response) => {
  const error = `
    Route not found - This could be because:
      0. You have defined routes below (not above) this middleware in server.ts
      1. You have not implemented the route ${req.method} ${req.path}
      2. There is a typo in either your test or server, e.g. /posts/list in one
         and, incorrectly, /post/list in the other
      3. You are using ts-node (instead of ts-node-dev) to start your server and
         have forgotten to manually restart to load the new changes
      4. You've forgotten a leading slash (/), e.g. you have posts/list instead
         of /posts/list in your server.ts or test file
  `;
  res.status(404).json({ error });
});

// Start server
const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
