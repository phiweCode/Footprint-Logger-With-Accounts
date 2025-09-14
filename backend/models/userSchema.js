const { mongoose } = require('../database/db');
const { Schema } = mongoose;

const GHGLogsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  category: { type: String, required: true },
  mode: { type: String, required: true },
  estimatedContribution: { type: Number, required: true }
}, { timestamps: true });

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minLength: 8 },
  refreshToken: { type: String }
}, { timestamps: true });

UserSchema.virtual('logs', {
  ref: 'ghg_log',
  localField: '_id',
  foreignField: 'user'
});

const UserModel = mongoose.model('user', UserSchema);
const GHGLogsModel = mongoose.model('ghg_log', GHGLogsSchema);

module.exports = { UserModel, GHGLogsModel };
