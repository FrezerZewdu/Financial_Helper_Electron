import fse from'fs-extra';
import path from'path';
import sq3 from'sqlite3';
import logger from'./logger';
import {docDir} from'./settings';

export const dbPath = path.join(docDir,'sqliteDatabase');
fse.ensureFileSync(dbPath);

const sqlite3 = sq3.verbose();
const db = new sqlite3.Database(dbPath);

db.serialize(()=>{
    // creates accounts table
    db.run('Create table IF NOT EXISTS Accounts(id integer PRIMARY KEY AUTOINCREMENT NOT NULL, bank_name VARCHAR(150) NOT NULL, account_type VARCHAR(20) NOT NULL, personal_identifier VARCHAR(150), account_number VARCHAR(20) NOT NULL, balance REAL DEFAULT 0.00 NOT NULL, description VARCHAR(300), account_open_date TEXT, active INTEGER DEFAULT 0 NOT NULL, account_close_date INTEGER DEFAULT NULL)',
    (err) =>{
        logger('form accounts'+err)
    })

    // create goals table
    db.run('Create table IF NOT EXISTS Goals(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(50) NOT NULL, description VARCHAR(250), timeline VARCHAR(6) NOT NULL, financial_target REAL DEFAULT 5.00 NOT NULL, start_date TEXT NOT NULL, end_date TEXT, active INTEGER, priority INTEGER DEFAULT 5 NOT NULL,achieved_date TEXT, image VARCHAR(100),identifier VARCHAR(100), amount INTEGER DEFAULT 0.00 NOT NULL)',
    (err) =>{
        logger('from goals '+ err)
    })

    // create ledger table
    db.run('Create table IF NOT EXISTS Ledgers(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name VARCHAR(50) NOT NULL, description VARCHAR(250), created_date TEXT NOT NULL, total_income REAL, total_expense REAL, net REAL, active INTEGER DEFAULT 1 NOT NULL,closed_date TEXT, total_tax REAL DEFAULT 0.00 NOT NULL )',
    (err)=>{
        logger('from ledgers '+err)
    })

    // create expenses table
    db.run('Create table IF NOT EXISTS Expenses(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, registered_date TEXT NOT NULL, done INTEGER NOT NULL, done_date TEXT, amount REAL NOT NULL, description VARCHAR(250), category VARCHAR(100), isDeductable INTEGER DEFAULT 0 NOT NULL, ledger_id INTEGER NOT NULL, FOREIGN KEY (ledger_id) REFERENCES Ledgers(id))',
    (err)=>{
        logger('from expenses '+err)
    })

    // create incomes table 
    db.run('Create table IF NOT EXISTS Income(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, registered_date TEXT NOT NULL, done INTEGER NOT NULL, done_date TEXT, amount REAL NOT NULL, isTaxed INTEGER DEFAULT 0 NOT NULL, percentage_taxed INTEGER DEFAULT 15 NOT NULL, taxed_amount REAL, description VARCHAR(250), category VARCHAR(100), ledger_id INTEGER NOT NULL, FOREIGN KEY (ledger_id) REFERENCES Ledgers(id))',
    (err)=>{
        logger('from Income '+err)
    })

    // create Yearly_summaries table
    db.run('Create table IF NOT EXISTS Yearly_summaries(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, start_date INTEGER NOT NULL, end_date INTEGER NOT NULL, total_income REAL, total_expense REAL)',
    (err)=>{
        logger('from yearly summaries table '+err)
    })

    // create Monthly_summaries table
    db.run('Create table IF NOT EXISTS Monthly_summaries(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, month INTEGER NOT NULL, total_income REAL, total_expense REAL, net REAL, yearly_summary_id INTEGER NOT NULL, FOREIGN KEY (yearly_summary_id) REFERENCES Yearly_summaries(id) )',
    (err)=>{
        logger('from monthly summaries table '+err)
    })

    // create Deductables table
    db.run('Create table IF NOT EXISTS Deductables(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, reciept_id VARCHAR(30), file_place VARCHAR(40), name VARCHAR(50), amount REAL, reason VARCHAR(150), viable INTEGER DEFAULT 0,expendable_date INTEGER,used INTEGER, used_date INTEGER, expense_id INTEGER NOT NULL, FOREIGN KEY (expense_id) REFERENCES Expenses(id) )',
    (err)=>{
        logger('from deductables table '+err)
    })

    // create income distribution table
    db.run('Create table IF NOT EXISTS Income_distribution(income_id INTEGER NOT NULL,account_id INTEGER NOT NULL, amount REAL,FOREIGN KEY(account_id) REFERENCES Accounts(id),FOREIGN KEY(income_id) REFERENCES Income(id) )',
    (err)=>{
        logger('from Income distribution table '+ err)
    })

    // create income goal distribution table
    db.run('Create table IF NOT EXISTS Income_goal_distribution(income_id INTEGER NOT NULL,goal_id INTEGER NOT NULL, amount REAL,FOREIGN KEY(income_id) REFERENCES Income(id),FOREIGN KEY(goal_id) REFERENCES Goals(id))',
    (err)=>{
        logger('from Income goal distribution table '+err)
    })
})

export default db