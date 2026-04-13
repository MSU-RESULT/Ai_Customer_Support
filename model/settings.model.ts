import mongoose, { Schema, model, models } from "mongoose";

interface ISettings {
  ownerId: string;
  businessName?: string;
  supportEmail?: string;
  knowledge?: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
    },
    supportEmail: {
      type: String,
    },
    knowledge: {
      type: String,
    },
  },
  { timestamps: true }
);

// This check is crucial for Next.js to prevent re-defining the model on every reload
const Settings = models.Settings || model<ISettings>("Settings", settingsSchema);

export default Settings;