import mongoose from 'mongoose'

const Schema = mongoose.Schema;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tags: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
      },
      created: {
        type: String,
        default: Date,
        required: true
      },
    updatedAt: {
       type: Date,
       required: true,
       default: Date.now(),
      } 
});

const messageSchema = new Schema({
  fullName: {
      type: String,
      required: true
  }, 
  userEmail: {
      type: String,
      required: true
  }, 
  description: {
      type: String,
      required: true
  }
});

const MessageModelSchema = new Schema({
  fullName: {
      type: String,
      required: true
  }, 
  userEmail: {
      type: String,
      required: true
  }, 
  description: {
      type: String,
      required: true
  }
});

const Message = mongoose.model('Message', messageSchema);
const MessageModel = mongoose.model('MessageModel', MessageModelSchema);

const Category = mongoose.model('Category', categorySchema);

export { Category, Message, MessageModel };