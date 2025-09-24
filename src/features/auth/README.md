## Features / Auth

Папка `features/auth` отвечает за всю логику авторизации пользователей в приложении.

### Типы авторизации

На данный момент реализованы следующие варианты:

- **Credentials (email + username + password)**  
  Отвечает за регистрацию и авторизацию пользователей через форму логина с использованием email или username и пароля.

- **(В будущем)** можно добавить другие способы авторизации, например:
    - OAuth (Google, GitHub и т.д.)
    - JWT / Token-based авторизация
    - Two-Factor Authentication (2FA)
    - MultiFactor Authentication (MFA)
