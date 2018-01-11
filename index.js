const electron = require('electron');
const {ipcMain, app} = electron;
const BrowserWindow = electron.BrowserWindow;
const settings = require('electron-settings');

const currURL = 'http://localhost:3000/';

const path = require('path');
const url = require('url');
const login = require('facebook-chat-api');
let fb;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 750, 
        height: 775,
        transparent: true,
        frame: false,
        show: false,
        // skipTaskbar: true, // hides from taskbar
        resizeable: false,
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`${currURL}`);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        if (settings.has('name')) {
            console.log(settings.get('name'));
            mainWindow.webContents.send('fb:login_exists', settings.get('name'));
        }

        mainWindow.show();
    });

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function loginSuccess(currWindow, value) {
    let state = null;

    const myID = fb.getCurrentUserID();
    fb.getUserInfo(myID, (err, ret) => {
        if (err) return console.error(err);

        for (let prop in ret) {
            if (ret.hasOwnProperty(prop)) {
                state = Object.assign({}, ret[prop]);
                state.id = myID;
            }
        }
        if (value && value.checked) {
            settings.set('name', state.name);
            settings.set('email', value.email);
            settings.set('password', value.password);
        } else if (value) {
            settings.delete('name');
            settings.delete('email');
            settings.delete('password');
        }
        mainWindow.webContents.send('fb:login_done', state);

        const currBounds = currWindow.getBounds();
        const newBounds = {
            x: currBounds.x - (1360 - currBounds.width)/2,
            y: currBounds.y,
            width: 1360,
            height: 800
        };
        currWindow.webContents.send('load:start', '/messenger');
        setTimeout(() => {
            currWindow.setBounds(newBounds);
        }, 300);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
    // react devtools
    BrowserWindow.addDevToolsExtension('/Users/Steven/AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0');
    // redux devtools
    BrowserWindow.addDevToolsExtension('/Users/Steven/AppData/Local/Google/Chrome/User Data/Profile 1/Extensions/lmhkpmbekcpmknklioeibfkpmmfibljd/2.15.1_0');
    createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        console.log('logout!');
        if (fb) {
            fb.logout((err) => { 
                if (err) console.log(err); 
                
                console.log('logout successful');
            
                app.quit();
            });
        } else {
            app.quit();
        }
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('fb:login_start', (event, value) => {
    if (!value.email && !value.password && settings.has('name')) {
        login({email: settings.get('email'), password: settings.get('password')}, (err, api) => {
            if (err) {
                mainWindow.webContents.send('fb:login_error');
                return console.error(err);
            }
            fb = api;

            loginSuccess(mainWindow);
        });
    } else {
        const loginInfo = {email: value.email, password: value.password};

        login(loginInfo, (err, api) => {
            
            if (err) {
                mainWindow.webContents.send('fb:login_error');
                return console.error(err);
            }
            fb = api;

            loginSuccess(mainWindow, value);
        });
    }
});

ipcMain.on('fb:send_message', (event, msg) => {
    if (fb) {
        fb.sendMessage(msg.value, msg.id);
    } else {
        return console.error("fb:send_message => Login before using the app.");
    }
});

ipcMain.on('fb:thread_list_start', (event, start, end) => {
    if (fb) {
        fb.getFriendsList((err, data) => {
            if (err) return console.error(err);

            const threadList = [];
            for (let i = 0; i < data.length; i++) {
                threadList.push(new Promise((resolve, reject) => {
                    fb.getThreadInfoGraphQL(data[i].userID, (err, info) => {
                        if (err) {
                            reject();
                            return console.error(err);
                        } else {
                            resolve([info, data[i]]);
                        }
                    });
                }).then((result) => {
                    const pics = {};
                    let str = '';

                    str += result[1].fullName;
                    for (let i = 0; i < result[0].participantIDs.length; i++) {
                        let curr = result[0].participantIDs[i];
                        if (curr === fb.getCurrentUserID()) continue;

                        pics[curr] = `https://graph.facebook.com/${curr}/picture`;
                    }

                    result[0].name = str;
                    result[0].profilePics = pics;

                    return result[0];
                }).catch(() => {
                    return console.error('fb:thread_list_start: promise failed');
                }));
            }

            Promise.all(threadList).then((results) => {
                // console.log(results);
                mainWindow.webContents.send('fb:thread_list_done', results);
            }).catch((errors) => {
                return console.error(errors);
            });
        });
    } else {
        return console.error("fb:thread_list_start => Login before using the app.")
    }
});

ipcMain.on('fb:thread_history_start', (event, obj) => {
    if (fb) {
        fb.getThreadHistoryGraphQL(obj.id, obj.count, obj.timestamp, (err, history) => {
            if (err) return console.error(err);

            mainWindow.webContents.send('fb:thread_history_done', history);
        });
    } else {
        return console.error("fb:thread_info_start => Login before using the app.")
    }
});