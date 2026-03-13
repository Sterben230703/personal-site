import mongoose, { Schema, Document } from 'mongoose';

export interface ICacheEntry extends Document {
  key: string;
  data: unknown;
  fetchedAt: Date;
}

const CacheEntrySchema = new Schema<ICacheEntry>({
  key:       { type: String, required: true, unique: true, index: true },
  data:      { type: Schema.Types.Mixed, required: true },
  fetchedAt: { type: Date, required: true },
});

export default mongoose.models.CacheEntry ||
  mongoose.model<ICacheEntry>('CacheEntry', CacheEntrySchema);
