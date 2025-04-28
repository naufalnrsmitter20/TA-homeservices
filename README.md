
# 🛠️ TA-Homeservices Project Guide

Welcome to the TA-Homeservices project!  
This guide will help you to clone the project, run it locally, edit it, and push your changes back to GitHub.

---

## 📋 Requirements

- [Git](https://git-scm.com/)
- [Node.js & npm](https://nodejs.org/)
- GitHub account

---

## 📥 1. Clone the Project

1. Open your terminal and navigate to the folder where you want to clone the project:

    ```bash
    cd path/to/your/folder
    ```

2. Clone the repository:

    ```bash
    git clone https://github.com/naufalnrsmitter20/TA-homeservices.git
    ```

3. Navigate into the project folder:

    ```bash
    cd TA-homeservices
    ```

---

## 📂 2. Project Structure

```
TA-homeservices/
│
├── backend/   # Backend project (e.g., API)
│
├── frontend/  # Frontend project (e.g., Website UI)
```

---

## 🚀 3. Running the Project

> Make sure to run backend and frontend separately!

### 🟦 Running Backend

1. Go to the `backend` folder:

    ```bash
    cd backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```
    
3. Gneerate Prisma:

    ```bash
    npx prisma generate
    ```

4. Run the backend server:

    ```bash
    npm run dev
    ```

---

### 🟪 Running Frontend

1. Open a new terminal and go to the `frontend` folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the frontend:

    ```bash
    npm run dev
    ```

By default:
- Frontend runs at: `http://localhost:3000`
- Backend runs at: `http://localhost:5000` (adjust based on your setup)

---

## ✍️ 4. Editing and Pushing Changes

After making changes to the project, follow these steps to push your updates to GitHub:

1. Check the status of changes:

    ```bash
    git status
    ```

2. Add the changes:

    ```bash
    git add .
    ```

3. Commit the changes:

    ```bash
    git commit -m "Your commit message here"
    ```

4. Push the changes to GitHub:

    ```bash
    git push origin main
    ```

---

## 🛠️ Troubleshooting

- **Permission Denied Error:**  
  Make sure you are authenticated to GitHub using your account.

- **Dependency Errors:**  
  Check your Node.js and npm versions. Update if needed.

- **Always Pull Before Editing:**  
  To avoid conflicts, run:

    ```bash
    git pull origin main
    ```

before making changes.

---

## 📣 Tips

- Commit often to save your progress.
- Use clear commit messages to track changes easily.

---

Happy coding! 🚀
