'use strict';

const electron=require('electron');
const app=electron.app;
const {BrowserWindow}=electron;

var mainWindow=null;

app.on('windows-all-closed',function(){
        if (process.platform!='darwin'){
            app.quit();
        }
});

app.on('ready',createWindow);

function createWindow(){
    mainWindow = new BrowserWindow({width:800,height:600});
    mainWindow.loadURL('file://'+__dirname+'/index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed',function() {
        mainWindow = null;
    });
}
app.on('activate',function(){
    if (mainWindow===null){
        createWindow();
    }
});
