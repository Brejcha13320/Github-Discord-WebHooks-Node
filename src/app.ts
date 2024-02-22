import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithuSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();

  const controller = new GithubController();

  app.use(express.json());
  app.use(GithuSha256Middleware.verifySignature);
  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`App Running on Port ${envs.PORT}`);
  });
}
