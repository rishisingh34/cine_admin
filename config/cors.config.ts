import cors from "cors";

const corsOptions = {
  origin: [
    "https://yadavrahul818980.github.io/webApp_admin_portal/" ,
    "https://yadavrahul818980.github.io/webApp_admin_portal",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

const handleCors = cors(corsOptions);

export default handleCors;
