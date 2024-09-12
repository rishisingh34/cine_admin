import cors from "cors";

const corsOptions = {
  origin: [
    "https://ornate-duckanoo-8bcb1e.netlify.app"
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

export default handleCors;
