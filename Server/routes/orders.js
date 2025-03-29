// Add at the top
const app = require('express')();

router.post('/', auth, async (req, res) => {
  try {
    // ... existing order creation code
    const io = req.app.get('io');
    io.emit('order_created', order); // Broadcast new order
    res.json(order);
  } catch (err) {
    // ...
  }
});