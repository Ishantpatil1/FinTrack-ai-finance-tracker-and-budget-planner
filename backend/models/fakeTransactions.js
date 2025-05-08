const { faker } = require('@faker-js/faker');

const generateFakeTransactions = (userId, numTransactions = 10) => {
  const transactions = [];
  
  for (let i = 0; i < numTransactions; i++) {
    const transaction = {
      userId,  // User ID will be passed dynamically
      amount: parseFloat(faker.commerce.price()),
      category: faker.helpers.arrayElement(['Salary','Groceries', 'Bills', 'Entertainment', 'Shopping', 'Travel']),
      note: faker.lorem.sentence(),
      type: faker.helpers.arrayElement(['income', 'expense']),
      date: faker.date.recent(),
    };
    transactions.push(transaction);
  }

  return transactions;
};

module.exports = generateFakeTransactions;