'use strict';

/* Node 專用的 Zone.js */
require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');

/* 從這裡載入 SSR 的 bundle 檔 */
const appServer = require('./dist-server/main.bundle');

/* 主要的伺服器渲染函式 */
function angularRouter(req, res) {

  /* Server-side rendering */
   res.render('index', { req, res });

}

const app = express();

/* 處理網站根目錄的 HTTP 要求 */
app.get('/', angularRouter);

/* 處理所有靜態檔案 */
app.use(express.static(`${__dirname}/dist`));

/* 設定 Angular Express 引擎 */
app.engine('html', ngUniversal.ngExpressEngine({
   bootstrap: appServer.AppServerModuleNgFactory
})); 
app.set('view engine', 'html');
app.set('views', 'dist');

/* 將所有其他 HTTP 要求都轉給 angularRouter 函式處理 */
app.get('*', angularRouter);

/* 監聽 Port 3000 */
app.listen(3000, () => {
   console.log(`Listening on http://localhost:3000`); 
});