const { mongoose } = require('../database/db');
const { Schema } = mongoose;

const GHGLogsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  category: { type: String, required: true },
  mode: { type: String, required: true },
  estimatedContribution: { type: Number, required: true }
}, { timestamps: true });

const GoalSchema = new Schema({ 
  user: { 
    type: Schema.Types.ObjectId, 
    ref: "user", 
    required: true
  },
  weeklyLimitGoal: { 
    type: Number
  },
  endsAt: { 
    type: Date,
    default: ()=>{ 
      return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }
  }
}, {
    timestamps: true
  })

GoalSchema.virtual('daysRemainingCalc').get(function () {
  const diff = Date.now() - this.createdAt.getTime();
  return Math.max(0, 7 - Math.floor(diff / (1000 * 60 * 60 * 24)));
});


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

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });


const UserModel = mongoose.model('user', UserSchema);
const GHGLogsModel = mongoose.model('ghg_log', GHGLogsSchema);
const GoalsModel = mongoose.model('UserGoal', GoalSchema)

module.exports = { UserModel, GHGLogsModel, GoalsModel };
