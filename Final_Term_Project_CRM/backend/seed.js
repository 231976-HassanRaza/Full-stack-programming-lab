const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Customer = require('./models/Customer');
const User = require('./models/User');

dotenv.config();

const customers = [
  { name: 'Ahmed Khan', email: 'ahmed.khan@techpk.com', phone: '+92-300-1234567', company: 'TechPK Solutions', status: 'Active', address: 'Blue Area, Islamabad', notes: 'Key enterprise client', totalRevenue: 250000 },
  { name: 'Sara Malik', email: 'sara.malik@nexgen.pk', phone: '+92-321-9876543', company: 'NexGen Industries', status: 'Active', address: 'Gulberg III, Lahore', notes: 'Premium subscriber', totalRevenue: 185000 },
  { name: 'Usman Tariq', email: 'usman@startuphub.pk', phone: '+92-333-5551234', company: 'StartupHub', status: 'Lead', address: 'DHA Phase 5, Karachi', notes: 'Interested in enterprise plan', totalRevenue: 0 },
  { name: 'Fatima Zahra', email: 'fatima.zahra@digitaledge.pk', phone: '+92-345-7890123', company: 'DigitalEdge', status: 'Active', address: 'F-7, Islamabad', notes: 'Monthly retainer client', totalRevenue: 320000 },
  { name: 'Bilal Chaudhry', email: 'bilal.c@innovate.pk', phone: '+92-312-4567890', company: 'Innovate Pvt Ltd', status: 'Inactive', address: 'Johar Town, Lahore', notes: 'Contract ended Q1 2025', totalRevenue: 95000 },
  { name: 'Ayesha Siddiqui', email: 'ayesha.s@cloudpro.pk', phone: '+92-300-9988776', company: 'CloudPro Systems', status: 'Lead', address: 'Clifton Block 5, Karachi', notes: 'Follow up scheduled for July', totalRevenue: 0 },
  { name: 'Hamza Raza', email: 'hamza.raza@ecommerse.pk', phone: '+92-323-6547891', company: 'EcomFirst', status: 'Active', address: 'G-10, Islamabad', notes: 'High-value repeat customer', totalRevenue: 410000 },
  { name: 'Zainab Hussain', email: 'zainab.h@mediapro.pk', phone: '+92-340-1231234', company: 'MediaPro Agency', status: 'Active', address: 'PECHS, Karachi', notes: 'Social media management project', totalRevenue: 150000 },
  { name: 'Omar Sheikh', email: 'omar.sheikh@fintech.pk', phone: '+92-301-7654321', company: 'FinTech Pakistan', status: 'Lead', address: 'I-8, Islamabad', notes: 'Demo call completed', totalRevenue: 0 },
  { name: 'Hira Baig', email: 'hira.baig@edutech.pk', phone: '+92-335-2223334', company: 'EduTech Solutions', status: 'Inactive', address: 'Model Town, Lahore', notes: 'Budget issues, revisit in Q3', totalRevenue: 60000 },
  { name: 'Kashif Anwar', email: 'kashif.a@logistix.pk', phone: '+92-311-9870987', company: 'LogistiX', status: 'Active', address: 'Korangi Industrial, Karachi', notes: 'Long-term logistics partner', totalRevenue: 530000 },
  { name: 'Sana Iqbal', email: 'sana.iqbal@healthplus.pk', phone: '+92-344-5556667', company: 'HealthPlus Clinic', status: 'Lead', address: 'F-10, Islamabad', notes: 'Needs custom EMR module', totalRevenue: 0 },
  { name: 'Tariq Mehmood', email: 'tariq.m@retailking.pk', phone: '+92-302-1112223', company: 'RetailKing', status: 'Active', address: 'Saddar, Rawalpindi', notes: 'POS system integration client', totalRevenue: 280000 },
  { name: 'Nadia Farooq', email: 'nadia.f@automates.pk', phone: '+92-315-4445556', company: 'AutoMates', status: 'Inactive', address: 'DHA Phase 2, Islamabad', notes: 'Paused project, potential revival', totalRevenue: 40000 },
  { name: 'Imran Yousaf', email: 'imran.y@securenet.pk', phone: '+92-300-8887776', company: 'SecureNet Solutions', status: 'Active', address: 'Bahria Town, Rawalpindi', notes: 'Cybersecurity consulting client', totalRevenue: 375000 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/crm_db');
    console.log('✅ MongoDB Connected');

    // Create a default admin user
    let admin = await User.findOne({ email: 'admin@crm.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@crm.com',
        password: 'admin123',
      });
      console.log('✅ Admin user created: admin@crm.com / admin123');
    }

    await Customer.deleteMany({});
    const seeded = await Customer.insertMany(customers.map(c => ({ ...c, createdBy: admin._id })));
    console.log(`✅ ${seeded.length} customers seeded successfully!`);

    mongoose.disconnect();
    console.log('🎉 Seeding complete!');
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
