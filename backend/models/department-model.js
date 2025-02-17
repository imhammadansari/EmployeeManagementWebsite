import mongoose from 'mongoose';

const departmentSchema = mongoose.Schema({
    name: String,
})

export default mongoose.model("departments", departmentSchema);
