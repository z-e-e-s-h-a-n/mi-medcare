import { validateEnv } from "./env.schema";

const createBaseEnv = () => ({
  NODE_ENV: "test",
  APP_PORT: "4000",
  APP_ENDPOINT: "http://localhost:4000",
  CLIENT_ENDPOINT: "http://localhost:3000",
  ADMIN_ENDPOINT: "http://localhost:3001",
  CORS_ORIGIN: "http://localhost:3000,http://localhost:3001",
  DB_URI: "postgresql://postgres:password@localhost:5432/mi_medcare_test",
  CLOUDINARY_CLOUD_NAME: "demo-cloud",
  CLOUDINARY_API_KEY: "demo-key",
  CLOUDINARY_API_SECRET: "demo-secret",
  CLOUDINARY_URL: "cloudinary://demo-key:demo-secret@demo-cloud",
  OTP_EXP: "15m",
  JWT_ACCESS_SECRET: "access-secret",
  JWT_REFRESH_SECRET: "refresh-secret",
  ACCESS_TOKEN_EXP: "15m",
  REFRESH_TOKEN_EXP: "7d",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "587",
  SMTP_USER: "noreply@example.com",
  SMTP_PASS: "smtp-pass",
  IP_STACK_API_KEY: "",
  ADMIN_NAME: "Admin User",
  ADMIN_EMAIL: "admin@example.com",
  ADMIN_PASSWORD: "password",
});

describe("validateEnv", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("accepts the required core configuration without optional integrations", () => {
    const parsed = validateEnv(createBaseEnv());

    expect(parsed.APP_PORT).toBe(4000);
    expect(parsed.CORS_ORIGIN).toEqual([
      "http://localhost:3000",
      "http://localhost:3001",
    ]);
    expect(parsed.GOOGLE_CLIENT_ID).toBe("");
    expect(parsed.FIREBASE_PROJECT_ID).toBe("");
  });

  it("rejects missing required core values", () => {
    expect(() =>
      validateEnv({
        ...createBaseEnv(),
        DB_URI: undefined,
      }),
    ).toThrow("Invalid environment variables");
  });
});
