// import {ipcRenderer} from 'electron';
const {ipcRenderer} = window.require('electron');
import {FB_LOGIN, FB_STATUS} from './types';

// console.log('action ddd');

export const fbLogin = (state) => (dispatch) => {
  ipcRenderer.send('fb:login_start', state);

  ipcRenderer.on('fb:login_done', (event, state) => {
    // ipcRenderer.send('loader_off');
    dispatch({type: FB_LOGIN, payload: state});
  });

  ipcRenderer.on('fb:login_error', (event) => {
    // ipcRenderer.send('loader_off');
    ipcRenderer.removeAllListeners('fb:login_error');
    dispatch({type: FB_STATUS, payload: 'error'});
  });
}

export const sendFbMsg = (msg) => {
  ipcRenderer.send('fb:send_message', msg);
};

export const getThreadList = (start, end) => {
  ipcRenderer.send('fb:thread_list_start', start, end);
};

export const getThreadHistory = (obj) => {
  ipcRenderer.send('fb:thread_history_start', obj);
};

export const markAsRead = (id) => {
  ipcRenderer.send('fb:mark_message_as_read', id);
};