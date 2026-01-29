import { app } from "./app";
import { env } from "./config/env";
import { checkDbConnection } from "./db/connection";

async function bootstrap() {
  try {
    await checkDbConnection();
    console.log("✅ Database connected");

    app.listen(env.port, () => {
      console.log(
        `🚀 Server running on port ${env.port} (${env.nodeEnv})`
      );
    });
  } catch (err) {
    console.error("❌ Failed to start server", err);
    process.exit(1);
  }
}

bootstrap();
