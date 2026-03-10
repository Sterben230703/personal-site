import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  date: Date;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  published: boolean;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true, enum: ['AI', 'System-Design', 'Backend', 'Algorithms'] },
  tags: [{ type: String }],
  summary: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, default: false },
});

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
