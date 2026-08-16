require("dotenv").config();
const connectDB = require("./config/db");
const MenuItem = require("./models/MenuItem");

const items = [
  // Antipasti
  { name: "Bruschetta al Pomodoro", description: "Toasted bread, fresh tomato, basil, garlic, olive oil", price: 8, category: "Antipasti", isFeatured: true },
  { name: "Carpaccio di Manzo", description: "Thinly sliced beef, arugula, parmesan, lemon", price: 14, category: "Antipasti" },
  { name: "Caprese Salad", description: "Buffalo mozzarella, tomato, basil, balsamic glaze", price: 10, category: "Antipasti" },
  { name: "Calamari Fritti", description: "Crispy fried calamari served with marinara sauce and lemon aioli", price: 13, category: "Antipasti" },
  { name: "Burrata", description: "Creamy burrata with prosciutto di Parma, arugula, and aged balsamic", price: 16, category: "Antipasti", isFeatured: true },
  { name: "Arancini", description: "Crispy risotto balls stuffed with mozzarella and peas, marinara dip", price: 11, category: "Antipasti" },

  // Primi
  { name: "Spaghetti alla Carbonara", description: "Egg, pecorino, guanciale, black pepper", price: 16, category: "Primi", isFeatured: true },
  { name: "Risotto ai Funghi", description: "Arborio rice, wild mushrooms, parmesan, white wine", price: 17, category: "Primi" },
  { name: "Lasagna della Casa", description: "Layers of pasta, ragù, béchamel, parmesan", price: 15, category: "Primi" },
  { name: "Gnocchi al Pesto", description: "Potato gnocchi, basil pesto, pine nuts, parmesan", price: 15, category: "Primi" },
  { name: "Fettuccine Alfredo", description: "Fresh fettuccine in a rich parmesan cream sauce", price: 15, category: "Primi" },
  { name: "Penne all'Arrabbiata", description: "Penne in a spicy tomato sauce with garlic and chili", price: 14, category: "Primi" },

  // Secondi
  { name: "Osso Buco", description: "Braised veal shank, saffron risotto, gremolata", price: 26, category: "Secondi", isFeatured: true },
  { name: "Branzino al Forno", description: "Oven-roasted sea bass, lemon, herbs, olive oil", price: 24, category: "Secondi" },
  { name: "Pollo alla Parmigiana", description: "Breaded chicken, tomato sauce, mozzarella", price: 19, category: "Secondi" },
  { name: "Bistecca alla Fiorentina", description: "Grilled T-bone steak, rosemary, olive oil, sea salt", price: 34, category: "Secondi" },
  { name: "Saltimbocca alla Romana", description: "Veal cutlets, prosciutto, sage, white wine sauce", price: 25, category: "Secondi" },
  { name: "Melanzane alla Parmigiana", description: "Layered eggplant, tomato sauce, mozzarella, basil", price: 17, category: "Secondi" },

  // Dolci
  { name: "Tiramisu", description: "Espresso-soaked ladyfingers, mascarpone, cocoa", price: 8, category: "Dolci", isFeatured: true },
  { name: "Panna Cotta", description: "Vanilla bean cream, berry coulis", price: 7, category: "Dolci" },
  { name: "Cannoli Siciliani", description: "Crisp shells, sweet ricotta, pistachio, chocolate chips", price: 8, category: "Dolci" },
  { name: "Gelato Trio", description: "Three scoops: pistachio, chocolate, and hazelnut", price: 7, category: "Dolci" },
  { name: "Torta al Cioccolato", description: "Warm flourless chocolate cake, vanilla gelato", price: 9, category: "Dolci" },
  { name: "Zabaglione", description: "Warm whipped egg yolk custard with Marsala wine and berries", price: 8, category: "Dolci" },
];

const run = async () => {
  await connectDB();
  await MenuItem.deleteMany({});
  await MenuItem.insertMany(items);
  console.log(`Seeded ${items.length} menu items.`);
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});