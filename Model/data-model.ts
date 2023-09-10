import mongoose, { Document } from "mongoose";

// Define an interface representing a user document
export interface QueryModelDto extends Document {
  query: string;
  dataPoints: string[];
  queriedOn: Date;
  queriedCount: number;
}

const querySchema = new mongoose.Schema<QueryModelDto>({
  query: {
    type: String,
    required: true,
  },
  dataPoints: {
    type: [String],
    required: true,
  },
  queriedOn: {
    type: Date,
    default: new Date(),
  },
    queriedCount:{
      type: Number,
      default: 1
    }
});

export const queryData = mongoose.model<QueryModelDto>(
  "querySchema",
  querySchema
);
