import express from "express";
import cors from "cors";
import { IntakeSubmissionSchema } from "@starter/shared";

const app = express();
app.use(cors({ origin: true })); // tighten in prod
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/submit", (req, res) => {
  const parsed = IntakeSubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  // TODO: persist or forward to your real API (e.g., bask)
  // For demo:
  const data = parsed.data;
  console.log("Received intake:", data);

  res.status(201).json({ status: "saved", receivedAt: new Date().toISOString() });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
