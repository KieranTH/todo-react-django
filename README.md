# TODO APP README

## Overview

This To-Do app is built using Create React App (CRA) & Django.

The interlacing functionality between both these packages is driven through Task, a Go module for enhanced scripting. You can find the available commands for this in the `Taskfile.yml` file.

This project also utilises a `Dev Container` to allow for system agnostic Development, Testing and Building.

## Project Structure

```
.devcontainer/
    devcontainer.json
    post-install.sh
backend/
    backend/
        __init__.py
        asgi.py
        settings.py
        urls.py
        wsgi.py
    db.sqlite3
    manage.py
    poetry.lock
    pyproject.toml
    README.md
    tests/
        __init__.py
    todo/
        __init__.py
        admin.py
        apps.py
        migrations/
        models.py
        serializers.py
        tests.py
        urls.py
        views.py
frontend/
    .env
    .gitignore
    package.json
    public/
    README.md
    src/
    tailwind.config.js
    tsconfig.json
README.md
Taskfile.yml
```

## Getting Started

All of these steps assume you're running in a Dev Container.

If you're not - Feel free to parse through the `Taskfile.yml` file and look at all the commands its built around.

### Backend

The backend is a Django application located in the `backend/` directory. It uses Poetry for dependency management.

#### Running

1. Run Backend Server:
   ```sh
   task backend
   ```

### Frontend

The frontend is a React application located in the `frontend/` directory. It uses npm for dependency management.

#### Running

1. Install Deps:

   ```sh
   task frontend-install
   ```

2. Run Frontend Server:
   ```sh
   task frontend
   ```

### Building the Frontend

To build the frontend for production, run:

```sh
task build
```

### Taskfile

The `Taskfile.yml` contains various tasks to streamline development.

### Available Tasks

- **migrate**: Run migrations for the `todo` app.
- **backend**: Run the backend server.
- **frontend-install**: Install frontend dependencies.
- **frontend**: Run the frontend development server.
- **run-clean**: Install frontend dependencies and run the development server.
- **build**: Build the frontend for production.

#### Running Tasks

To run a task, use the `task` command followed by the task name. For example, to run the backend server:

```sh
task {TASK}
```
