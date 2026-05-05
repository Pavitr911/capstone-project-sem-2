import { useState } from 'react';

export default function IndexPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Salary', amount: 4500, type: 'income', category: 'Income' },
    { id: 2, title: 'Groceries', amount: 210, type: 'expense', category: 'Food' },
    { id: 3, title: 'Rent', amount: 1200, type: 'expense', category: 'Housing' },
    { id: 4, title: 'Freelance', amount: 980, type: 'income', category: 'Side Job' },
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('Misc');

  const income = transactions
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + item.amount, 0);

  const expenses = transactions
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expenses;

  const addTransaction = (event) => {
    event.preventDefault();
    const parsedAmount = Number(amount);
    if (!title.trim() || !category.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    const nextTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: parsedAmount,
      type,
      category: category.trim(),
    };

    setTransactions([nextTransaction, ...transactions]);
    setTitle('');
    setAmount('');
    setType('income');
    setCategory('Misc');
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <main className="page-content">
      <section className="dashboard-grid">
        <article className="summary-card">
          <h2>Total Balance</h2>
          <p className="large-value">₹{balance.toLocaleString()}</p>
        </article>

        <article className="quick-card income-card">
          <h3>Income</h3>
          <p>₹{income.toLocaleString()}</p>
        </article>

        <article className="quick-card expense-card">
          <h3>Expenses</h3>
          <p>₹{expenses.toLocaleString()}</p>
        </article>
      </section>

      <section className="transactions-section">
        <div className="transactions-header">
          <h2>Manage Transactions</h2>
          <p>Add income or expense entries, then remove them as needed.</p>
        </div>

        <form className="transaction-form" onSubmit={addTransaction}>
          <div className="form-row">
            <label>
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Salary, Rent, Food..."
                required
              />
            </label>

            <label>
              Amount
              <input
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Type
              <select value={type} onChange={(event) => setType(event.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </label>

            <label>
              Category
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Category"
                required
              />
            </label>
          </div>

          <button type="submit" className="submit-button">
            Add transaction
          </button>
        </form>

        <div className="transaction-list">
          {transactions.map((transaction) => (
            <article key={transaction.id} className={`transaction-card ${transaction.type}`}>
              <div>
                <h3>{transaction.title}</h3>
                <p>{transaction.category}</p>
              </div>

              <div className="transaction-meta">
                <span>{transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}</span>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeTransaction(transaction.id)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
