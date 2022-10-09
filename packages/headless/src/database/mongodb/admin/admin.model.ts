import { model, Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import { Admin } from 'src/entity/admin';

const AdminSchema = new Schema<Admin>(
  {
    id: {
      type: String,
      default: () => randomUUID(),
      index: true,
      unique: true,
    },
    info: {
      name: {
        type: String,
        index: true,
      },
      email: {
        type: String,
        index: true,
      },
      phone: String,
    },
    password: String,
    roles: [String],
    // branchId
    branch: {
      type: String,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const AdminModel = model<Admin>('Admin', AdminSchema);
export { AdminModel };
