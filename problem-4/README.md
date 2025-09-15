# How to run tests with Vitest

## Using PowerShell (Windows)
1. Open PowerShell as Administrator and run the following command to allow script execution:
	```powershell
	Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
	```

2. Install Vitest:
	```powershell
	npm install vitest --save-dev
	```

3. Run the tests:
	```powershell
	npx vitest run
	```

## Using Bash (Linux/macOS/WSL)
1. Open your terminal (bash).

2. Install Vitest:
	```bash
	npm install vitest --save-dev
	```

3. Run the tests:
	```bash
	npx vitest run
	```

The result will display the execution time of each function in the console.
# code-challenge-99