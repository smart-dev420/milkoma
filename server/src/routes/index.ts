import apiRoute from "./api.route";
import authRoute from "./auth.route";

export default function setupRoute(app: any) {
  app.use("/auth", authRoute);
  app.use("/api", apiRoute);
}
