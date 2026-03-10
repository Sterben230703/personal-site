import mongoose, { Schema, Document } from 'mongoose';

export interface ILearningLog extends Document {
  date: Date;
  content: string;
  tags: string[];
}

const LearningLogSchema = new Schema<ILearningLog>({
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  tags: [{ type: String }],
});

export default mongoose.models.LearningLog || mongoose.model<ILearningLog>('LearningLog', LearningLogSchema);
