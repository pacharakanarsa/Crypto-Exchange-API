// check-mongo.js
const { MongoClient } = require('mongodb');

// เปลี่ยน URL ตรงนี้ให้ตรงกับของคุณ
const uri = 'mongodb://localhost:27017'; // หรือ mongodb+srv://... สำหรับ Atlas
const client = new MongoClient(uri);

async function checkConnection() {
  try {
    await client.connect(); // เชื่อมต่อ
    console.log('✅ Connected to MongoDB');
    
    // ทดสอบเลือก database ชื่อ test
    const db = client.db('test');
    const collections = await db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
  } finally {
    await client.close(); // ปิดการเชื่อมต่อ
  }
}

checkConnection();
