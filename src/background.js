'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
import db from '@/database/db.js'


const isDevelopment = process.env.NODE_ENV !== 'production'
const path=require('path')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,

      preload: path.join(__dirname,'main_process/preload.js')
    }
  })

  // creates new income transaction on the database
  ipcMain.on('create-income', async (event, income)=>{
    if(income.done == 1){
      var stmt = db.prepare("INSERT into Income (registered_date,done_date,done,amount,isTaxed,percentage_taxed,taxed_amount,description,category,ledger_id) values(CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,1,?,?,?,?,?,?,?)")
      stmt.run(income.amount,income.isTaxed,income.percentageTaxed,income.taxedAmount,income.description,income.category,income.ledgerId,
        (err)=>{
          if(err){
            console.log(err)
            event.returnValue = JSON.parse(JSON.stringify({"message": "Failed income creation"}))
          }else{
            event.returnValue = JSON.parse(JSON.stringify({"message": "success full income entry"}))
          }
        })
    }else{
      var stmt2 = db.prepare("INSERT into Income (registered_date,done,amount,isTaxed,percentage_taxed,taxed_amount,description,category,ledger_id) values(CURRENT_TIMESTAMP,0,?,?,?,?,?,?,?)")
      stmt2.run(income.amount,income.isTaxed,income.percentageTaxed,income.taxedAmount,income.description,income.category,income.ledgerId,
        (err)=>{
          if(err){
            console.log(err)
            event.returnValue = JSON.parse(JSON.stringify({"message": "Failed income creation"}))
          }else{
            event.returnValue = JSON.parse(JSON.stringify({"message": "success full income entry"}))
          }
        })
    }
    
  })
    
    // creates new income transaction on the database
    let expenseId
    ipcMain.on('create-expense', async (event, expense)=>{
      if(expense.done == 1){
        var stmt = db.prepare("INSERT into Expenses (registered_date,done_date,done,amount,description,category,isDeductable,ledger_id) values(CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,3,?,?,?,?,?)")
        stmt.run(expense.amount,expense.description,expense.category,expense.isDeductable,expense.ledgerId,
          (err)=>{
            if(err){
              console.log(err)
              expenseId = db.get("SELECT last_insert_rowid()")
              event.returnValue = JSON.parse(JSON.stringify({"message": "Failed expense creation"}))
            }else{
              event.returnValue = JSON.parse(JSON.stringify({"message": "success full expense entry"}))
            }
          })
      }else{
        var stmt2 = db.prepare("INSERT into Expenses (registered_date,done,amount,description,category,isDeductable,ledger_id) values(CURRENT_TIMESTAMP,2,?,?,?,?,?)")
        stmt2.run(expense.amount,expense.description,expense.category,expense.isDeductable,expense.ledgerId,
          (err)=>{
            if(err){
              console.log(err)
              expenseId = db.get("SELECT last_insert_rowid()")
              event.returnValue = JSON.parse(JSON.stringify({"message": "Failed expense creation"}))
            }else{
              event.returnValue = JSON.parse(JSON.stringify({"message": "success full expense entry"}))
            }
          })
      }
      if(expense.isDeductable == 1){
        var stmt3 = db.prepare("INSERT into Deductables (reciept_id,file_place,name, amount, reason, viable, expendable_date,used,expense_id) values (?,?,?,?,?,?,?,?,?)")
        stmt3.run(expense.deduct.recieptId,expense.deduct.filePlace,expense.deduct.name,expense.amount,expense.deduct.reason,expense.deduct.viable,expense.deduct.expendableDate,expense.deduct.used,expenseId,
          (err)=>{
            if(err){
              console.log(err)
              event.returnValue = JSON.parse(JSON.stringify({"message": "Failed deductable creation"}))
            }else{
              event.returnValue = JSON.parse(JSON.stringify({"message": "Failed deductable creation"}))
            }
          })
      }      
    })


  ipcMain.on('create-goals', async(event,goal)=>{
    var stmt = db.prepare("INSERT into Goals (name,description,timeline,financial_target,start_date,end_date,active,priority,achieved_date,image,identifier,amount) values (?,?,?,?,?,?,?,?,?,?,?,?)")
    stmt.run(goal.name,goal.description,goal.timeline,goal.financialTarget,goal.startDate,goal.endDate,goal.active,goal.priority,goal.acheivedDate,goal.image,goal.identifier,goal.amount,
      (err)=>{
        if(err){
          console.log(err)
              event.returnValue = JSON.parse(JSON.stringify({"message": "Failed goal creation"}))
        }else{
          event.returnValue = JSON.parse(JSON.stringify({"message": "Failed goal creation"}))
        }
      })
  })

  // creates new ledger on the database
  ipcMain.on('create-ledger', async(event,ledger)=>{
    var stmt = db.prepare("Insert into Ledgers (name, description, created_date,total_income,total_expense,net, active, total_tax) values (?,?,CURRENT_TIMESTAMP,0,0,0.00,?,0)")
    stmt.run(ledger.name,ledger.description,ledger.active,
      (err)=>{
        if(err){
          console.log(err)
          event.returnValue= "failed ledger insert"
        }
        else{
          event.returnValue = "ledger insert successfull"
        }
      })
  })


  // creates new account on the database
  ipcMain.on('create-account', async (event, account)=>{
    console.log(account)
    var newAccount = ""
    var stmt = db.prepare("insert into Accounts (bank_name, account_type, personal_identifier, account_number, balance, description, account_open_date, active) values (?,?,?,?,?,?,CURRENT_TIMESTAMP,?);")
    stmt.run(account.bankName,account.accountType,account.personalIdentifier,account.accountNumber,account.balance,account.description,account.active,
    (err)=>{
      if(err){
        console.log(err)
        newAccount = 'failed'
      }
      else{
        console.log('insert has been commited')
        newAccount = 'success'
      }
    })
    return newAccount
  })

  // gets all the ledgers created
  ipcMain.handle('get-Ledgers',async(event)=>{
    try {
      const data = await get_ledger();
      return data
    } catch (error) {
      event.returnValue = "no data"     
    }
  })

  // get all goals from the database when called
  ipcMain.handle('get-goals', async (event)=>{
    try{
      const data = await get_goals()
      return data
    }catch(error){
      event.returnValue = JSON.parse(JSON.stringify({"message": "can't get goals"}))
    }

  })

  // gets all the accounts from the database when called
  ipcMain.handle('get-Accounts',async (event)=>{
    try{
      const data = await db_request();
      return data
    }catch(error){
      event.returnValue = 'no data'
    }    
  })

  // gets all the transactions from the database when called (both income and expenses)
  ipcMain.handle('get-transactions',async (event)=>{
    try{
      const data =  await get_transaction();
      return data
    }catch (error){
      event.returnValue = JSON.parse(JSON.stringify({"data": "failed get"}))
    }
  })

  // Functions
  let db_request = () =>{
    return new Promise((resolve,reject)=>{
      const data= []
      db.each("Select * from Accounts",(err,row)=>{
        if(!err){
          data.push({"id": row.id,"bankName": row.bank_name,"accountType": row.account_type,"personalIdentifier":row.personal_identifier,"accountNumber": row.account_number,"balance":row.balance,"description": row.description,"accountDate":row.account_open_date,"active": row.active, "accountCloseDate": row.account_close_date})
        }
      }, (error)=>{
        if(error){
          reject(error)
        }else{
          resolve(data)
        }
      })
    })
  }

  let get_ledger = () =>{
    return new Promise((resolve,reject)=>{
      const data = []
      db.each("select * from Ledgers", (err,row)=>{
        if(!err){
          data.push({"id": row.id,"name": row.name,"description": row.description, "createdDate": row.created_date,"totalIncome": row.total_income,"totalExpense": row.total_expense,"net":row.net,"active": row.active,"closedDate": row.closed_date,"totalTax": row.total_tax})
        }
      },(error)=>{
        if(error){
          reject(error)
        }
        else{
          resolve(data)
        }
      })
    })
  }

  let get_transaction = () => {
    return new Promise((resolve,reject)=>{
      const data = []
      db.each("select * from Income",(err,row)=>{
        if(!err){
          data.push({"id": row.id,"registeredDate": row.registered_date,"doneDate": row.done_date,"done": row.done,"amount": row.amount,"isTaxed": row.isTaxed,"percentageTaxed": row.percentage_taxed,"taxedAmount": row.taxed_amount,"description": row.description,"category": row.category,"ledgerId":row.ledger_id})
        }
      db.each("select * from Expenses",(err,row)=>{
        if(!err){
          data.push({"id":row.id,"registeredDate": row.registered_date,"doneDate": row.done_date,"done":row.done,"amount": row.amount,"description": row.description,"category": row.category,"isDeductable": row.isDeductable,"ledgerId":row.ledger_id})
        }
      })
      },(error)=>{
        if(error){
          reject(error)
        }else{
          resolve(data)
        }
      })
    })
  } 

  let get_goals = () =>{
    return new Promise((resolve,reject)=>{
      const data = []
      db.each("SELECT * from Goals",(err,row)=>{
        if(!err){
          data.push({"id":row.id,"name": row.name,"description": row.description,"timeline": row.timeline,"financialTarget": row.financial_target,"startDate": row.start_date,"endDate": row.end_date,"active": row.active,"priority": row.priority,"achievedDate": row.achieved_date,"image": row.image,"identifier": row.identifier,"amount": row.amount})
        }
      },(error)=>{
        if(error){
          reject(error)
        }else{
          resolve(data)
        }
      })
    })
  }

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.ejs')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
