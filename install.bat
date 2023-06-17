cd helpers/security
call npm install
call npm run test
cd ..
cd ..
cd db-handler
call npm install
cd ..
cd auth-server
call npm install
call npm link ../helpers/security
call npm run test
pause